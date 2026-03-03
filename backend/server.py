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
        "name": "Industrial RO Plant",
        "slug": "industrial-ro-plant",
        "category": "RO Plants",
        "description": "High-capacity Industrial Reverse Osmosis Plant designed for commercial and industrial applications with premium quality membranes and automated control systems. Features corrosion-resistant components and low maintenance design.",
        "short_description": "Industrial RO system for commercial and industrial use",
        "specifications": {
            "Power": "3 Phase, 440V",
            "Recovery Rate": "60-80%",
            "TDS Rejection": "95-99%",
            "Material": "SS 304/316/FRP",
            "Automation": "Semi/Fully Automatic",
            "Warranty": "1 Year"
        },
        "price_range": "On Request",
        "image_url": "/products/prod-1.png",
        "features": ["High TDS rejection", "Low power consumption", "Automatic operation", "SS 304 frame", "Premium membranes"],
        "is_featured": True
    },
    {
        "id": "prod-2",
        "name": "Commercial RO Plant",
        "slug": "commercial-ro-plant",
        "category": "RO Plants",
        "description": "Compact commercial RO plant ideal for offices, restaurants, hotels and small businesses. Efficient purification with minimal space requirements and easy maintenance.",
        "short_description": "Compact RO system for offices, restaurants and hotels",
        "specifications": {
            "Power": "Single/Three Phase",
            "Recovery Rate": "50-70%",
            "TDS Rejection": "90-98%",
            "Material": "SS 304/FRP",
            "Automation": "Semi-Automatic",
            "Warranty": "1 Year"
        },
        "price_range": "On Request",
        "image_url": "/products/prod-3.png",
        "features": ["Compact design", "Easy installation", "Low maintenance", "Quality membranes", "Pre-filter included"],
        "is_featured": False
    },
    {
        "id": "prod-3",
        "name": "Effluent Treatment Plant (ETP)",
        "slug": "effluent-treatment-plant",
        "category": "Treatment Plants",
        "description": "Semi-automatic Effluent Treatment Plant for industrial wastewater management. Compliant with pollution control board norms. Handles chemical, biological, and physical treatment processes.",
        "short_description": "Industrial ETP for wastewater management",
        "specifications": {
            "Treatment Type": "Physical, Chemical, Biological",
            "Material": "MS/SS/FRP",
            "Automation": "Semi/Fully Automatic",
            "Compliance": "CPCB/SPCB Norms",
            "Warranty": "1 Year"
        },
        "price_range": "On Request",
        "image_url": "/products/prod-4.png",
        "features": ["CPCB compliant", "Low sludge generation", "Odor control", "Automated dosing", "Real-time monitoring"],
        "is_featured": True
    },
    {
        "id": "prod-4",
        "name": "Sewage Treatment Plant (STP)",
        "slug": "sewage-treatment-plant",
        "category": "Treatment Plants",
        "description": "Advanced Sewage Treatment Plant using SBR/MBBR technology. Ideal for residential complexes, hotels, institutions and commercial establishments.",
        "short_description": "STP for residential and commercial use",
        "specifications": {
            "Technology": "SBR/MBBR/MBR",
            "BOD Removal": ">95%",
            "COD Removal": ">90%",
            "TSS Removal": ">95%",
            "Material": "MS Epoxy/SS/FRP",
            "Automation": "Fully Automatic"
        },
        "price_range": "On Request",
        "image_url": "/products/prod-5.png",
        "features": ["Low footprint", "Reusable treated water", "Low power consumption", "Minimal odor", "Easy operation"],
        "is_featured": True
    },
    {
        "id": "prod-5",
        "name": "Industrial Water Softener",
        "slug": "industrial-water-softener",
        "category": "Water Softeners",
        "description": "High-capacity water softener for industrial applications. Removes hardness-causing minerals for boiler feed, cooling towers, and process water applications.",
        "short_description": "Industrial grade water softening system",
        "specifications": {
            "Hardness Removal": "Up to 500 ppm",
            "Resin Type": "Strong Acid Cation",
            "Regeneration": "Automatic Timer/Manual",
            "Material": "FRP/MS Rubber Lined",
            "Warranty": "1 Year"
        },
        "price_range": "On Request",
        "image_url": "/products/prod-6.png",
        "features": ["Automatic regeneration", "Low salt consumption", "Long resin life", "Compact design", "Easy maintenance"],
        "is_featured": False
    },
    {
        "id": "prod-6",
        "name": "Industrial Water Chiller",
        "slug": "industrial-water-chiller",
        "category": "Coolers & Chillers",
        "description": "High-efficiency industrial water chiller for process cooling applications. Suitable for manufacturing, plastic molding, and pharmaceutical industries.",
        "short_description": "Process cooling water chiller system",
        "specifications": {
            "Temperature Range": "5°C - 25°C",
            "Refrigerant": "R410A/R407C",
            "Compressor": "Scroll/Screw",
            "Material": "SS 304 Tank",
            "Power": "3 Phase, 440V"
        },
        "price_range": "On Request",
        "image_url": "/products/prod-7.png",
        "features": ["Energy efficient", "Digital temperature control", "Low noise operation", "Eco-friendly refrigerant", "Compact footprint"],
        "is_featured": False
    },
    {
        "id": "prod-7",
        "name": "SS Water Cooler",
        "slug": "ss-water-cooler",
        "category": "Coolers & Chillers",
        "description": "Stainless steel water cooler for commercial and industrial use. Hygienic design with high cooling capacity for schools, offices, and factories.",
        "short_description": "Commercial SS water cooling dispenser",
        "specifications": {
            "Material": "SS 304",
            "Compressor": "Hermetically Sealed",
            "Power": "Single/Three Phase",
            "Warranty": "1 Year"
        },
        "price_range": "On Request",
        "image_url": "/products/prod-8.png",
        "features": ["Food grade SS", "Fast cooling", "Easy cleaning", "Durable construction", "Low maintenance"],
        "is_featured": False
    },
    {
        "id": "prod-8",
        "name": "Demineralization Plant (DM)",
        "slug": "demineralization-plant",
        "category": "RO Plants",
        "description": "DM Plant for producing high-purity demineralized water. Essential for boiler feed, pharmaceutical, and electronic industries.",
        "short_description": "High-purity DM water production system",
        "specifications": {
            "Output Quality": "<10 µS/cm",
            "Resin Type": "Strong Acid + Strong Base",
            "Regeneration": "Acid + Alkali",
            "Material": "FRP/MS Rubber Lined",
            "Automation": "Manual/Auto"
        },
        "price_range": "On Request",
        "image_url": "/products/prod-9.png",
        "features": ["High purity output", "Efficient regeneration", "Long resin life", "Modular design", "Easy operation"],
        "is_featured": False
    },
    {
        "id": "prod-9",
        "name": "Swimming Pool Filtration Plant",
        "slug": "swimming-pool-filtration-plant",
        "category": "Treatment Plants",
        "description": "Complete swimming pool water treatment solution with filtration, chlorination, and pH control. Mild steel construction with epoxy coating.",
        "short_description": "Pool water filtration and treatment system",
        "specifications": {
            "Filtration": "Sand/Activated Carbon",
            "Chlorination": "Auto Dosing",
            "Material": "MS Epoxy Coated",
            "Pump": "Centrifugal SS",
            "Automation": "Fully Automatic"
        },
        "price_range": "On Request",
        "image_url": "/products/prod-10.png",
        "features": ["Crystal clear water", "Automatic chemical dosing", "Energy efficient pumps", "Low maintenance", "Complete package"],
        "is_featured": False
    },
    {
        "id": "prod-10",
        "name": "Flow Meter",
        "slug": "flow-meter",
        "category": "Instruments",
        "description": "Precision flow meters for accurate measurement of water flow in pipelines. Available in electromagnetic, ultrasonic, and mechanical types for various applications.",
        "short_description": "Precision flow measurement instruments",
        "specifications": {
            "Types": "Electromagnetic/Ultrasonic/Mechanical",
            "Accuracy": "±0.5% to ±2%",
            "Display": "Digital LCD",
            "Output": "4-20mA/Pulse/RS485",
            "Material": "SS/PVC/PTFE Lined"
        },
        "price_range": "On Request",
        "image_url": "/products/flow-meter.png",
        "features": ["High accuracy", "Digital display", "Multiple outputs", "Low maintenance", "Easy installation"],
        "is_featured": False
    },
    {
        "id": "prod-11",
        "name": "Piezometer",
        "slug": "piezometer",
        "category": "Instruments",
        "description": "Piezometers for measuring water pressure and groundwater levels. Essential for geotechnical monitoring, dam safety, and water resource management.",
        "short_description": "Water pressure and level monitoring instruments",
        "specifications": {
            "Types": "Vibrating Wire/Standpipe/Pneumatic",
            "Range": "0-100m water column",
            "Accuracy": "±0.1% FS",
            "Output": "Frequency/4-20mA",
            "Material": "SS 316"
        },
        "price_range": "On Request",
        "image_url": "/products/piezometer.png",
        "features": ["High precision", "Long-term stability", "Corrosion resistant", "Remote monitoring capable", "Easy installation"],
        "is_featured": False
    },
    {
        "id": "prod-12",
        "name": "SCADA System",
        "slug": "scada-system",
        "category": "Automation",
        "description": "Supervisory Control and Data Acquisition (SCADA) systems for complete automation and monitoring of water treatment plants. Real-time data logging and remote access capabilities.",
        "short_description": "Complete plant automation and monitoring system",
        "specifications": {
            "Features": "Real-time Monitoring/Data Logging/Alarms",
            "Communication": "Ethernet/RS485/GSM/WiFi",
            "Software": "Web-based/Desktop/Mobile App",
            "Compatibility": "All PLCs",
            "Storage": "Cloud/Local Server"
        },
        "price_range": "On Request",
        "image_url": "/products/scada-system.png",
        "features": ["Real-time monitoring", "Remote access", "Data logging", "Alarm management", "Report generation"],
        "is_featured": True
    },
    {
        "id": "prod-13",
        "name": "Control Panel",
        "slug": "control-panel",
        "category": "Automation",
        "description": "Custom-designed electrical control panels for water treatment plants. PLC-based automation with HMI touchscreen interface for easy operation and monitoring.",
        "short_description": "PLC-based automation control panels",
        "specifications": {
            "Type": "PLC/Relay Based",
            "HMI": "Touchscreen Display",
            "Protection": "IP55/IP65",
            "Material": "Powder Coated MS/SS",
            "Standards": "IEC/IS Standards"
        },
        "price_range": "On Request",
        "image_url": "/products/control-panel.png",
        "features": ["PLC automation", "Touchscreen HMI", "Remote monitoring", "Safety interlocks", "Energy monitoring"],
        "is_featured": False
    }
]

SERVICES_DATA = [
    {
        "id": "serv-1",
        "name": "Water Treatment Services",
        "slug": "water-treatment-services",
        "description": "Complete water treatment solutions including design, installation, and commissioning of RO plants, DM plants, and water purification systems. We provide end-to-end solutions for industrial, commercial, and residential water treatment needs.",
        "short_description": "Complete water treatment solutions and installations",
        "icon": "Wrench",
        "features": ["System design & engineering", "Equipment supply", "Installation & commissioning", "Operator training", "Performance guarantee"],
        "image_url": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600"
    },
    {
        "id": "serv-2",
        "name": "Wastewater Management",
        "slug": "wastewater-management",
        "description": "Comprehensive wastewater management services including ETP and STP design, installation, operation, and maintenance. We help industries comply with pollution control norms and achieve zero liquid discharge.",
        "short_description": "ETP, STP design, installation and operation services",
        "icon": "RefreshCw",
        "features": ["ETP/STP design", "ZLD solutions", "CPCB compliance", "Sludge management", "Treated water recycling"],
        "image_url": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600"
    },
    {
        "id": "serv-3",
        "name": "Water Management",
        "slug": "water-management",
        "description": "Integrated water management services for industries, municipalities, and commercial establishments. We help optimize water usage, reduce wastage, and implement sustainable water practices.",
        "short_description": "Complete water resource management solutions",
        "icon": "TrendingUp",
        "features": ["Water audit", "Conservation planning", "Rainwater harvesting", "Groundwater recharge", "Water recycling systems"],
        "image_url": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600"
    },
    {
        "id": "serv-4",
        "name": "Annual Maintenance Contract",
        "slug": "annual-maintenance-contract",
        "description": "Comprehensive AMC packages for water treatment plants. Includes regular servicing, membrane cleaning, chemical replenishment, and emergency support to keep your systems running efficiently.",
        "short_description": "Complete maintenance packages for all equipment",
        "icon": "FileCheck",
        "features": ["Quarterly service visits", "Membrane cleaning", "Chemical supply", "24/7 support", "Spare parts discount"],
        "image_url": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600"
    },
    {
        "id": "serv-5",
        "name": "Water Quality Testing",
        "slug": "water-quality-testing",
        "description": "Professional water quality analysis services. Test for TDS, pH, hardness, chlorine, bacteria, heavy metals, and other parameters to ensure water safety and compliance.",
        "short_description": "Comprehensive water testing and analysis",
        "icon": "TestTube",
        "features": ["Physical parameters", "Chemical analysis", "Microbiological testing", "Heavy metals", "Detailed reports"],
        "image_url": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600"
    },
    {
        "id": "serv-6",
        "name": "Consultation Services",
        "slug": "consultation-services",
        "description": "Expert consultation for water and wastewater treatment projects. Our experienced team provides technical guidance, feasibility studies, and project planning to help you make informed decisions.",
        "short_description": "Expert technical consultation for water projects",
        "icon": "Target",
        "features": ["Feasibility studies", "Technology selection", "Cost estimation", "Regulatory compliance", "Project planning"],
        "image_url": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600"
    },
    {
        "id": "serv-7",
        "name": "Plant Installation",
        "slug": "plant-installation",
        "description": "Complete turnkey installation of water treatment plants including civil work, piping, electrical connections, and commissioning. Our expert team ensures proper setup and optimal performance.",
        "short_description": "Professional plant installation services",
        "icon": "Wrench",
        "features": ["Site survey", "Civil work", "Piping & electrical", "Commissioning", "Training"],
        "image_url": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600"
    },
    {
        "id": "serv-8",
        "name": "Plant Upgradation",
        "slug": "plant-upgradation",
        "description": "Upgrade your existing water treatment plant with latest technology. Automation upgrades, capacity enhancement, SCADA integration, and efficiency improvements.",
        "short_description": "Modernize your existing treatment plants",
        "icon": "TrendingUp",
        "features": ["PLC/SCADA automation", "Capacity upgrade", "Energy optimization", "Remote monitoring", "Performance guarantee"],
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
