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
    },
    {
        "id": "prod-14",
        "name": "Mineral Water Plant",
        "slug": "mineral-water-plant",
        "category": "RO Plants",
        "description": "Complete mineral water production plant with multi-stage purification including RO, UV, and ozone treatment. Suitable for packaged drinking water business with BIS compliance.",
        "short_description": "Packaged drinking water production system",
        "specifications": {
            "Purification": "RO + UV + Ozone",
            "Compliance": "BIS/IS 14543",
            "Material": "SS 304/316",
            "Automation": "Fully Automatic",
            "Packaging": "Jar/Bottle/Pouch",
            "Warranty": "1 Year"
        },
        "price_range": "On Request",
        "image_url": "/products/mineral-water-plant.png",
        "features": ["BIS compliant", "Multi-stage purification", "Auto packaging ready", "Low operating cost", "High production capacity"],
        "is_featured": True
    },
    {
        "id": "prod-15",
        "name": "Ultrafiltration (UF) System",
        "slug": "ultrafiltration-system",
        "category": "Treatment Plants",
        "description": "Industrial ultrafiltration system with hollow fiber membrane technology. Removes bacteria, viruses, and suspended solids for pre-treatment to RO or as standalone purification.",
        "short_description": "Hollow fiber membrane UF purification system",
        "specifications": {
            "Membrane": "Hollow Fiber PVDF/PES",
            "Pore Size": "0.01 - 0.1 micron",
            "Recovery": "90-95%",
            "Material": "SS/PVC Housing",
            "Backwash": "Automatic",
            "Warranty": "1 Year"
        },
        "price_range": "On Request",
        "image_url": "/products/ultrafiltration-system.png",
        "features": ["99.99% bacteria removal", "High recovery rate", "Auto backwash", "Low chemical usage", "Compact modular design"],
        "is_featured": False
    },
    {
        "id": "prod-16",
        "name": "Rain Water Harvesting Plant",
        "slug": "rain-water-harvesting-plant",
        "category": "Treatment Plants",
        "description": "Complete rainwater harvesting system with collection, filtration, storage, and groundwater recharge. Helps conserve water resources and comply with government regulations.",
        "short_description": "Rainwater collection and recharge system",
        "specifications": {
            "Components": "Filter/Storage/Recharge Well",
            "Filtration": "Sand + Carbon Filter",
            "Storage": "Underground/Overhead Tank",
            "Material": "PVC/FRP/RCC",
            "Compliance": "Government Norms"
        },
        "price_range": "On Request",
        "image_url": "/products/rainwater-harvesting.png",
        "features": ["Water conservation", "Ground water recharge", "Government compliant", "Low maintenance", "Custom design"],
        "is_featured": False
    },
    {
        "id": "prod-17",
        "name": "Cooling Tower",
        "slug": "cooling-tower",
        "category": "Coolers & Chillers",
        "description": "High-efficiency industrial cooling tower for process water cooling. FRP construction with low noise fans and energy-efficient design for HVAC and industrial applications.",
        "short_description": "Industrial FRP cooling tower system",
        "specifications": {
            "Type": "Induced Draft/Cross Flow",
            "Material": "FRP/Timber/RCC",
            "Fill Type": "PVC/PP Honeycomb",
            "Fan": "FRP Blade/Axial",
            "Motor": "TEFC Flameproof"
        },
        "price_range": "On Request",
        "image_url": "/products/cooling-tower.png",
        "features": ["Energy efficient", "Low noise operation", "Corrosion resistant FRP", "Easy maintenance", "Long service life"],
        "is_featured": True
    },
    {
        "id": "prod-18",
        "name": "Compost Machine",
        "slug": "compost-machine",
        "category": "Waste Management",
        "description": "Automatic organic waste composting machine for converting food waste and biodegradable waste into nutrient-rich compost. Eco-friendly solution for restaurants, hotels, and institutions.",
        "short_description": "Automatic organic waste composting system",
        "specifications": {
            "Type": "Rotating Drum",
            "Power": "Single/Three Phase",
            "Material": "MS/SS Construction",
            "Process Time": "24-48 Hours",
            "Output": "Nutrient-rich Compost"
        },
        "price_range": "On Request",
        "image_url": "/products/compost-machine.png",
        "features": ["Zero waste solution", "Automatic operation", "Odor free process", "Compact design", "Low power consumption"],
        "is_featured": False
    },
    {
        "id": "prod-19",
        "name": "Heat Pump",
        "slug": "heat-pump",
        "category": "Waste Management",
        "description": "Energy-efficient heat pump water heater for commercial and industrial hot water needs. Uses ambient air energy for heating, reducing electricity consumption by up to 70%.",
        "short_description": "Energy efficient water heating system",
        "specifications": {
            "COP": "3.5 - 5.0",
            "Temperature": "Up to 65°C",
            "Refrigerant": "R410A/R134a",
            "Material": "SS 304 Tank",
            "Power Saving": "Up to 70%"
        },
        "price_range": "On Request",
        "image_url": "/products/heat-pump.png",
        "features": ["70% power saving", "Eco-friendly", "All weather operation", "Digital controls", "Long life span"],
        "is_featured": False
    },
    {
        "id": "prod-20",
        "name": "Hydropneumatic System",
        "slug": "hydropneumatic-system",
        "category": "Pumps & Equipment",
        "description": "Hydropneumatic pressure booster system for maintaining constant water pressure in high-rise buildings, hospitals, and industrial plants. Automatic on/off with pressure sensors.",
        "short_description": "Automatic water pressure booster system",
        "specifications": {
            "Type": "Variable/Constant Speed",
            "Pumps": "SS Multistage Centrifugal",
            "Pressure": "Up to 10 Bar",
            "Control": "PLC/Pressure Switch",
            "Material": "SS 304/316"
        },
        "price_range": "On Request",
        "image_url": "/products/hydropneumatic-system.png",
        "features": ["Constant pressure", "Auto operation", "Energy efficient VFD", "Low noise", "Compact skid mounted"],
        "is_featured": True
    },
    {
        "id": "prod-21",
        "name": "Filter Press",
        "slug": "filter-press",
        "category": "Pumps & Equipment",
        "description": "Industrial filter press for sludge dewatering in ETP/STP plants. Hydraulic operation with high pressure filtration for maximum moisture removal from sludge.",
        "short_description": "Sludge dewatering filter press system",
        "specifications": {
            "Type": "Plate & Frame/Membrane",
            "Operation": "Hydraulic/Manual",
            "Plate Material": "PP/Cast Iron",
            "Pressure": "Up to 16 Bar",
            "Cloth": "PP/Nylon Filter Cloth"
        },
        "price_range": "On Request",
        "image_url": "/products/filter-press.png",
        "features": ["High dewatering efficiency", "Low moisture cake", "Automatic operation", "Durable construction", "Easy cloth replacement"],
        "is_featured": False
    },
    {
        "id": "prod-22",
        "name": "Dosing Pump",
        "slug": "dosing-pump",
        "category": "Pumps & Equipment",
        "description": "Precision chemical dosing pump for accurate chemical injection in water treatment processes. Diaphragm type with digital flow control for chlorine, alum, and polymer dosing.",
        "short_description": "Precision chemical metering pump",
        "specifications": {
            "Type": "Diaphragm/Plunger",
            "Flow Range": "0.1 - 500 LPH",
            "Pressure": "Up to 10 Bar",
            "Control": "Manual/Auto 4-20mA",
            "Material": "PP/SS/PVDF Head"
        },
        "price_range": "On Request",
        "image_url": "/products/dosing-pump.png",
        "features": ["Accurate dosing", "Digital flow control", "Chemical resistant", "Low maintenance", "Auto stroke adjustment"],
        "is_featured": False
    },
    {
        "id": "prod-23",
        "name": "Ozonator",
        "slug": "ozonator",
        "category": "Pumps & Equipment",
        "description": "Industrial ozone generator for water disinfection without chemicals. Effectively eliminates bacteria, viruses, and odor from water for drinking water and swimming pool applications.",
        "short_description": "Chemical-free water disinfection system",
        "specifications": {
            "Ozone Output": "5g - 100g/hr",
            "Feed Gas": "Air/Oxygen",
            "Generator": "Corona Discharge",
            "Material": "SS 316 Contact Tank",
            "Control": "Digital Timer/PLC"
        },
        "price_range": "On Request",
        "image_url": "/products/ozonator.png",
        "features": ["Chemical free disinfection", "Kills 99.9% bacteria", "No residual chemicals", "Low operating cost", "Automatic operation"],
        "is_featured": False
    },
    {
        "id": "prod-24",
        "name": "Oil Skimmer",
        "slug": "oil-skimmer",
        "category": "Pumps & Equipment",
        "description": "Industrial oil skimmer for removing floating oil and grease from effluent water. Essential pre-treatment equipment for ETP in automotive, food, and manufacturing industries.",
        "short_description": "Floating oil and grease removal system",
        "specifications": {
            "Type": "Belt/Disc/Tube",
            "Capacity": "Up to 100 L/hr oil removal",
            "Material": "SS 304/316",
            "Motor": "Geared Motor",
            "Operation": "Continuous"
        },
        "price_range": "On Request",
        "image_url": "/products/oil-skimmer.png",
        "features": ["Continuous operation", "High oil recovery", "Low maintenance", "Corrosion resistant", "Easy installation"],
        "is_featured": False
    },
    {
        "id": "prod-25",
        "name": "Agitator",
        "slug": "agitator",
        "category": "Pumps & Equipment",
        "description": "Industrial agitator and mixer for chemical mixing in water treatment tanks. Available in various impeller designs for different mixing requirements and tank sizes.",
        "short_description": "Chemical mixing and agitation system",
        "specifications": {
            "Type": "Propeller/Turbine/Paddle",
            "Material": "SS 304/316/PP",
            "Motor": "0.5 HP - 20 HP",
            "Speed": "Variable RPM",
            "Mounting": "Top/Side Entry"
        },
        "price_range": "On Request",
        "image_url": "/products/agitator.png",
        "features": ["Efficient mixing", "Variable speed", "Corrosion resistant", "Low vibration", "Easy maintenance"],
        "is_featured": False
    },
    {
        "id": "prod-26",
        "name": "Water ATM",
        "slug": "water-atm",
        "category": "Water Dispensing",
        "description": "Smart water ATM vending machine with RO purification and digital payment system. Provides safe drinking water access to communities with coin, card, and UPI payment options.",
        "short_description": "Smart water vending machine with RO purification",
        "specifications": {
            "Purification": "RO + UV + UF",
            "Payment": "Coin/Card/UPI",
            "Display": "LCD Touchscreen",
            "Storage": "500-1000L SS Tank",
            "Monitoring": "IoT/GSM Remote"
        },
        "price_range": "On Request",
        "image_url": "/products/water-atm.png",
        "features": ["Digital payment", "Pure RO water", "Remote monitoring", "Solar compatible", "Revenue generating"],
        "is_featured": True
    },
    {
        "id": "prod-27",
        "name": "Water Dispenser",
        "slug": "water-dispenser",
        "category": "Water Dispensing",
        "description": "Commercial hot and cold water dispenser for offices, schools, and public places. Stainless steel construction with energy-efficient compressor cooling system.",
        "short_description": "Hot and cold water dispensing unit",
        "specifications": {
            "Type": "Floor Standing/Table Top",
            "Cooling": "Compressor Based",
            "Hot Water": "Up to 90°C",
            "Cold Water": "5-10°C",
            "Material": "SS 304 Body"
        },
        "price_range": "On Request",
        "image_url": "/products/water-dispenser.png",
        "features": ["Hot & cold water", "Energy efficient", "Hygienic SS body", "Child safety lock", "Easy maintenance"],
        "is_featured": False
    },
    {
        "id": "prod-28",
        "name": "Water Pouch Packing Machine",
        "slug": "water-pouch-packing-machine",
        "category": "Water Dispensing",
        "description": "Automatic water pouch packing machine for packaged drinking water business. Form-fill-seal technology with UV sterilization and accurate volumetric filling.",
        "short_description": "Automatic water sachet packaging machine",
        "specifications": {
            "Type": "Form Fill Seal",
            "Speed": "1500-2500 pouches/hr",
            "Volume": "100-500 ml",
            "Sterilization": "UV Inline",
            "Material": "SS 304 Contact Parts"
        },
        "price_range": "On Request",
        "image_url": "/products/pouch-packing-machine.png",
        "features": ["High speed packaging", "Accurate filling", "UV sterilized", "Low wastage", "Easy operation"],
        "is_featured": False
    },
    {
        "id": "prod-29",
        "name": "AC/DC Drives",
        "slug": "ac-dc-drives",
        "category": "Automation",
        "description": "Variable frequency AC/DC drives for motor speed control in pumps, blowers, and compressors. Provides energy savings up to 40% with soft start and precise speed regulation.",
        "short_description": "Variable frequency motor speed controllers",
        "specifications": {
            "Type": "AC VFD/DC Drive",
            "Range": "0.5 HP - 500 HP",
            "Input": "Single/Three Phase",
            "Communication": "Modbus/Profibus",
            "Protection": "IP20/IP55"
        },
        "price_range": "On Request",
        "image_url": "/products/ac-dc-drives.png",
        "features": ["40% energy saving", "Soft start/stop", "Speed regulation", "Built-in protection", "Remote monitoring"],
        "is_featured": False
    },
    {
        "id": "prod-30",
        "name": "RO Membranes & Filter Housing",
        "slug": "ro-membranes-filter-housing",
        "category": "Accessories",
        "description": "High-quality RO membranes, filter housings, cartridge filters, UV lamps, FRP vessels, and multiport valves. Genuine replacement parts and accessories for all water treatment systems.",
        "short_description": "RO membranes, filters, vessels & spare parts",
        "specifications": {
            "Membranes": "4040/8040 TFC",
            "Filters": "PP/CTO/GAC Cartridges",
            "UV": "SS Chamber + Philips Lamp",
            "Vessels": "FRP 1054/1354/1665",
            "Valves": "Manual/Auto Multiport"
        },
        "price_range": "On Request",
        "image_url": "/products/accessories-membranes.png",
        "features": ["Genuine quality", "All brands available", "Bulk pricing", "Fast delivery", "Technical support"],
        "is_featured": False
    },
    {
        "id": "prod-31",
        "name": "Water Treatment Media & Chemicals",
        "slug": "water-treatment-media-chemicals",
        "category": "Accessories",
        "description": "Complete range of water treatment media including activated carbon, softener resin, MBBR media, tube settler media, and water treatment chemicals like antiscalant, pH boosters, and boiler chemicals.",
        "short_description": "Filter media, resins, and treatment chemicals",
        "specifications": {
            "Media": "Carbon/Resin/MBBR/Tube Settler",
            "Chemicals": "Antiscalant/pH Booster/Chlorine",
            "Boiler Chemicals": "Thermax Maxtreat Series",
            "Packaging": "25-50 Kg Bags/Drums",
            "Quality": "Industrial Grade"
        },
        "price_range": "On Request",
        "image_url": "/products/accessories-media-chemicals.png",
        "features": ["Premium quality", "All media types", "Boiler chemicals", "Competitive pricing", "Bulk supply"],
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
