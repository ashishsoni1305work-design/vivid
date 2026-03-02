from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(
    title="Vivid H2O Solutions API",
    description="Water Treatment Solutions - Industrial RO Plants, Effluent Treatment, and more",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    category: str
    description: str
    short_description: str
    specifications: dict
    price_range: Optional[str] = None
    image_url: str
    features: List[str]
    is_featured: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: str
    short_description: str
    icon: str
    features: List[str]
    image_url: str

class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    product_id: Optional[str] = None
    service_id: Optional[str] = None
    message: str
    inquiry_type: str = "general"

class Inquiry(InquiryCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    role: str
    content: str
    rating: int = 5

class CompanyInfo(BaseModel):
    name: str = "Vivid H2O Solutions"
    tagline: str = "Pure Water, Pure Life"
    description: str = "Leading manufacturer and supplier of industrial water treatment solutions since 2014"
    address: str = "C-125, Vidhya Nagar, Hoshangabad Road, Bhopal - 462026, Madhya Pradesh, India"
    phone: str = "+91-8770828302"
    email: str = "vividh2osolutions@gmail.com"
    gst: str = "23CCQPS3136K1Z7"
    established: int = 2014
    proprietor: str = "Ashish Soni"

# Seed data for products
PRODUCTS_DATA = [
    {
        "id": "prod-1",
        "name": "Industrial RO Plant 1000 LPH",
        "slug": "industrial-ro-plant-1000-lph",
        "category": "RO Plants",
        "description": "High-capacity Industrial Reverse Osmosis Plant with 1000 Liters Per Hour capacity. Designed for commercial and industrial applications with premium quality membranes and automated control systems. Features corrosion-resistant components and low maintenance design.",
        "short_description": "1000 LPH capacity industrial RO system for commercial use",
        "specifications": {
            "Capacity": "1000 LPH",
            "Power": "3 Phase, 440V",
            "Recovery Rate": "60-75%",
            "TDS Rejection": "95-98%",
            "Material": "SS 304/FRP",
            "Automation": "Semi-Automatic",
            "Warranty": "1 Year"
        },
        "price_range": "₹1,50,000 - ₹2,50,000",
        "image_url": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600",
        "features": ["High TDS rejection", "Low power consumption", "Automatic operation", "SS 304 frame", "Premium membranes"],
        "is_featured": True
    },
    {
        "id": "prod-2",
        "name": "Industrial RO Plant 2000 LPH",
        "slug": "industrial-ro-plant-2000-lph",
        "category": "RO Plants",
        "description": "Heavy-duty 2000 LPH Industrial RO Plant for large-scale water purification needs. Equipped with advanced pretreatment systems and high-rejection membranes for superior water quality.",
        "short_description": "2000 LPH heavy-duty RO system for large scale operations",
        "specifications": {
            "Capacity": "2000 LPH",
            "Power": "3 Phase, 440V",
            "Recovery Rate": "65-80%",
            "TDS Rejection": "96-99%",
            "Material": "SS 316/FRP",
            "Automation": "Fully Automatic",
            "Warranty": "1 Year"
        },
        "price_range": "₹3,00,000 - ₹4,50,000",
        "image_url": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600",
        "features": ["Fully automatic PLC control", "High recovery rate", "Energy efficient", "Remote monitoring capable", "Anti-scaling system"],
        "is_featured": True
    },
    {
        "id": "prod-3",
        "name": "Commercial RO Plant 100 LPH",
        "slug": "commercial-ro-plant-100-lph",
        "category": "RO Plants",
        "description": "Compact commercial RO plant ideal for offices, restaurants, and small businesses. Efficient purification with minimal space requirements.",
        "short_description": "Compact 100 LPH RO for offices and restaurants",
        "specifications": {
            "Capacity": "100 LPH",
            "Power": "Single Phase, 220V",
            "Recovery Rate": "50-60%",
            "TDS Rejection": "90-95%",
            "Material": "SS 304",
            "Automation": "Semi-Automatic",
            "Warranty": "1 Year"
        },
        "price_range": "₹35,000 - ₹55,000",
        "image_url": "https://images.unsplash.com/photo-1562016600-ece12b8f5428?w=600",
        "features": ["Compact design", "Easy installation", "Low maintenance", "Quality membranes", "Pre-filter included"],
        "is_featured": False
    },
    {
        "id": "prod-4",
        "name": "Effluent Treatment Plant",
        "slug": "effluent-treatment-plant",
        "category": "Treatment Plants",
        "description": "Semi-automatic Effluent Treatment Plant for industrial wastewater management. Compliant with pollution control board norms. Handles chemical, biological, and physical treatment processes.",
        "short_description": "Industrial ETP for wastewater management",
        "specifications": {
            "Capacity": "10-500 KLD",
            "Treatment Type": "Physical, Chemical, Biological",
            "Material": "MS/SS/FRP",
            "Automation": "Semi-Automatic",
            "Compliance": "CPCB Norms",
            "Warranty": "1 Year"
        },
        "price_range": "₹5,00,000 - ₹50,00,000",
        "image_url": "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600",
        "features": ["CPCB compliant", "Low sludge generation", "Odor control", "Automated dosing", "Real-time monitoring"],
        "is_featured": True
    },
    {
        "id": "prod-5",
        "name": "Sewage Treatment Plant 1500 LPH",
        "slug": "sewage-treatment-plant-1500-lph",
        "category": "Treatment Plants",
        "description": "Advanced Sewage Treatment Plant with 1500 LPH capacity using SBR/MBBR technology. Ideal for residential complexes, hotels, and institutions.",
        "short_description": "1500 LPH STP for residential and commercial use",
        "specifications": {
            "Capacity": "1500 LPH",
            "Technology": "SBR/MBBR",
            "BOD Removal": ">95%",
            "COD Removal": ">90%",
            "TSS Removal": ">95%",
            "Material": "MS Epoxy/SS",
            "Automation": "Fully Automatic"
        },
        "price_range": "₹8,00,000 - ₹15,00,000",
        "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
        "features": ["Low footprint", "Reusable treated water", "Low power consumption", "Minimal odor", "Easy operation"],
        "is_featured": False
    },
    {
        "id": "prod-6",
        "name": "Industrial Water Softener",
        "slug": "industrial-water-softener",
        "category": "Water Softeners",
        "description": "High-capacity water softener for industrial applications. Removes hardness-causing minerals for boiler feed, cooling towers, and process water applications.",
        "short_description": "Industrial grade water softening system",
        "specifications": {
            "Capacity": "1000-10000 LPH",
            "Hardness Removal": "Up to 500 ppm",
            "Resin Type": "Strong Acid Cation",
            "Regeneration": "Automatic Timer/Manual",
            "Material": "FRP/MS Rubber Lined",
            "Warranty": "1 Year"
        },
        "price_range": "₹50,000 - ₹3,00,000",
        "image_url": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600",
        "features": ["Automatic regeneration", "Low salt consumption", "Long resin life", "Compact design", "Easy maintenance"],
        "is_featured": False
    },
    {
        "id": "prod-7",
        "name": "Industrial Water Chiller",
        "slug": "industrial-water-chiller",
        "category": "Coolers & Chillers",
        "description": "High-efficiency industrial water chiller for process cooling applications. Suitable for manufacturing, plastic molding, and pharmaceutical industries.",
        "short_description": "Process cooling water chiller system",
        "specifications": {
            "Cooling Capacity": "5-100 TR",
            "Temperature Range": "5°C - 25°C",
            "Refrigerant": "R410A/R407C",
            "Compressor": "Scroll/Screw",
            "Material": "SS 304 Tank",
            "Power": "3 Phase, 440V"
        },
        "price_range": "₹55,000 - ₹10,00,000",
        "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
        "features": ["Energy efficient", "Digital temperature control", "Low noise operation", "Eco-friendly refrigerant", "Compact footprint"],
        "is_featured": False
    },
    {
        "id": "prod-8",
        "name": "SS Water Cooler",
        "slug": "ss-water-cooler",
        "category": "Coolers & Chillers",
        "description": "Stainless steel water cooler for commercial and industrial use. Hygienic design with high cooling capacity for schools, offices, and factories.",
        "short_description": "Commercial SS water cooling dispenser",
        "specifications": {
            "Capacity": "40-200 Liters",
            "Cooling": "150-500 LPH",
            "Material": "SS 304",
            "Compressor": "Hermetically Sealed",
            "Power": "Single/Three Phase",
            "Warranty": "1 Year"
        },
        "price_range": "₹25,000 - ₹75,000",
        "image_url": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600",
        "features": ["Food grade SS", "Fast cooling", "Easy cleaning", "Durable construction", "Low maintenance"],
        "is_featured": False
    },
    {
        "id": "prod-9",
        "name": "Demineralization Plant",
        "slug": "demineralization-plant",
        "category": "RO Plants",
        "description": "DM Plant for producing high-purity demineralized water. Essential for boiler feed, pharmaceutical, and electronic industries.",
        "short_description": "High-purity DM water production system",
        "specifications": {
            "Capacity": "500-5000 LPH",
            "Output Quality": "<10 µS/cm",
            "Resin Type": "Strong Acid + Strong Base",
            "Regeneration": "Acid + Alkali",
            "Material": "FRP/MS Rubber Lined",
            "Automation": "Manual/Auto"
        },
        "price_range": "₹1,00,000 - ₹8,00,000",
        "image_url": "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=600",
        "features": ["High purity output", "Efficient regeneration", "Long resin life", "Modular design", "Easy operation"],
        "is_featured": False
    },
    {
        "id": "prod-10",
        "name": "Swimming Pool Filtration Plant",
        "slug": "swimming-pool-filtration-plant",
        "category": "Treatment Plants",
        "description": "Complete swimming pool water treatment solution with filtration, chlorination, and pH control. Mild steel construction with epoxy coating.",
        "short_description": "Pool water filtration and treatment system",
        "specifications": {
            "Pool Size": "Up to 5 Lakh Liters",
            "Filtration": "Sand/Activated Carbon",
            "Chlorination": "Auto Dosing",
            "Material": "MS Epoxy Coated",
            "Pump": "Centrifugal SS",
            "Automation": "Fully Automatic"
        },
        "price_range": "₹2,00,000 - ₹10,00,000",
        "image_url": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600",
        "features": ["Crystal clear water", "Automatic chemical dosing", "Energy efficient pumps", "Low maintenance", "Complete package"],
        "is_featured": False
    }
]

SERVICES_DATA = [
    {
        "id": "serv-1",
        "name": "RO Plant Installation",
        "slug": "ro-plant-installation",
        "description": "Complete turnkey installation of RO plants including civil work, piping, electrical connections, and commissioning. Our expert team ensures proper setup and optimal performance.",
        "short_description": "Professional RO plant installation services",
        "icon": "Wrench",
        "features": ["Site survey", "Civil work", "Piping & electrical", "Commissioning", "Training"],
        "image_url": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600"
    },
    {
        "id": "serv-2",
        "name": "Annual Maintenance Contract",
        "slug": "annual-maintenance-contract",
        "description": "Comprehensive AMC packages for water treatment plants. Includes regular servicing, membrane cleaning, chemical replenishment, and emergency support.",
        "short_description": "Complete maintenance packages for all equipment",
        "icon": "FileCheck",
        "features": ["Quarterly service visits", "Membrane cleaning", "Chemical supply", "24/7 support", "Spare parts discount"],
        "image_url": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600"
    },
    {
        "id": "serv-3",
        "name": "Water Quality Testing",
        "slug": "water-quality-testing",
        "description": "Professional water quality analysis services. Test for TDS, pH, hardness, chlorine, bacteria, heavy metals, and other parameters.",
        "short_description": "Comprehensive water testing and analysis",
        "icon": "TestTube",
        "features": ["Physical parameters", "Chemical analysis", "Microbiological testing", "Heavy metals", "Detailed reports"],
        "image_url": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600"
    },
    {
        "id": "serv-4",
        "name": "Membrane Replacement & Cleaning",
        "slug": "membrane-replacement-cleaning",
        "description": "Expert membrane replacement and CIP (Clean-in-Place) services for RO plants. Restore membrane performance and extend equipment life.",
        "short_description": "Membrane servicing and replacement",
        "icon": "RefreshCw",
        "features": ["Performance testing", "CIP cleaning", "Membrane replacement", "Flux restoration", "Warranty support"],
        "image_url": "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600"
    },
    {
        "id": "serv-5",
        "name": "Plant Upgradation",
        "slug": "plant-upgradation",
        "description": "Upgrade your existing water treatment plant with latest technology. Automation upgrades, capacity enhancement, and efficiency improvements.",
        "short_description": "Modernize your existing treatment plants",
        "icon": "TrendingUp",
        "features": ["PLC automation", "Capacity upgrade", "Energy optimization", "Remote monitoring", "Performance guarantee"],
        "image_url": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600"
    }
]

TESTIMONIALS_DATA = [
    {
        "id": "test-1",
        "name": "Rajesh Kumar",
        "company": "Kumar Textiles Pvt Ltd",
        "role": "Plant Manager",
        "content": "Vivid H2O Solutions installed our 2000 LPH RO plant and the quality has been exceptional. The after-sales support is prompt and professional.",
        "rating": 5
    },
    {
        "id": "test-2",
        "name": "Dr. Priya Sharma",
        "company": "City Hospital Bhopal",
        "role": "Administration Head",
        "content": "We have been using their water treatment systems for 5 years. The DM plant provides consistently high-quality water for our medical equipment.",
        "rating": 5
    },
    {
        "id": "test-3",
        "name": "Amit Patel",
        "company": "Green Valley Resorts",
        "role": "General Manager",
        "content": "The swimming pool filtration system has been working flawlessly. Our guests always appreciate the crystal-clear pool water.",
        "rating": 5
    }
]

# Initialize database with seed data
@app.on_event("startup")
async def seed_database():
    # Check if products exist
    existing_products = await db.products.count_documents({})
    if existing_products == 0:
        for product in PRODUCTS_DATA:
            product['created_at'] = datetime.now(timezone.utc).isoformat()
            await db.products.insert_one(product)
        logging.info("Products seeded successfully")
    
    # Check if services exist
    existing_services = await db.services.count_documents({})
    if existing_services == 0:
        for service in SERVICES_DATA:
            await db.services.insert_one(service)
        logging.info("Services seeded successfully")
    
    # Check if testimonials exist
    existing_testimonials = await db.testimonials.count_documents({})
    if existing_testimonials == 0:
        for testimonial in TESTIMONIALS_DATA:
            await db.testimonials.insert_one(testimonial)
        logging.info("Testimonials seeded successfully")

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Vivid H2O Solutions API", "status": "active"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Vivid H2O Solutions API"}

# Products
@api_router.get("/products", response_model=List[dict])
async def get_products(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["is_featured"] = featured
    
    products = await db.products.find(query, {"_id": 0}).to_list(100)
    return products

@api_router.get("/products/categories")
async def get_product_categories():
    categories = await db.products.distinct("category")
    return {"categories": categories}

@api_router.get("/products/{slug}")
async def get_product_by_slug(slug: str):
    product = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Services
@api_router.get("/services", response_model=List[dict])
async def get_services():
    services = await db.services.find({}, {"_id": 0}).to_list(100)
    return services

@api_router.get("/services/{slug}")
async def get_service_by_slug(slug: str):
    service = await db.services.find_one({"slug": slug}, {"_id": 0})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

# Testimonials
@api_router.get("/testimonials", response_model=List[dict])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
    return testimonials

# Inquiries
@api_router.post("/inquiries")
async def create_inquiry(inquiry: InquiryCreate):
    inquiry_obj = Inquiry(**inquiry.model_dump())
    doc = inquiry_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.inquiries.insert_one(doc)
    return {"message": "Inquiry submitted successfully", "id": inquiry_obj.id}

# Company Info
@api_router.get("/company")
async def get_company_info():
    return CompanyInfo().model_dump()

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
