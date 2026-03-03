import asyncio
import os
import base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()

# Product image prompts - realistic industrial water treatment equipment
PRODUCTS = [
    {
        "id": "prod-1",
        "name": "Industrial RO Plant 1000 LPH",
        "prompt": "Professional product photo of an Industrial Reverse Osmosis (RO) Plant with 1000 LPH capacity. Show a complete RO system with stainless steel frame, blue FRP membrane housings arranged in series, pressure gauges, control panel with digital display, inlet and outlet pipes, pre-filter housings. Industrial factory setting with clean concrete floor. Photorealistic, high quality commercial product photography, well-lit, white background gradient."
    },
    {
        "id": "prod-2", 
        "name": "Industrial RO Plant 2000 LPH",
        "prompt": "Professional product photo of a large Industrial Reverse Osmosis (RO) Plant with 2000 LPH capacity. Show a heavy-duty RO system with robust stainless steel SS316 frame, multiple blue membrane housings, PLC control panel with touchscreen, high-pressure pump, multiple pressure gauges and flow meters, industrial piping. Large scale industrial equipment in factory setting. Photorealistic, commercial photography, studio lighting."
    },
    {
        "id": "prod-3",
        "name": "Commercial RO Plant 100 LPH", 
        "prompt": "Professional product photo of a compact Commercial RO Plant with 100 LPH capacity. Show a small-scale reverse osmosis unit with stainless steel frame, 2-3 membrane housings, small control panel, pre-filters, compact design suitable for offices and restaurants. Clean professional product photography with white background, well-lit, photorealistic."
    },
    {
        "id": "prod-4",
        "name": "Effluent Treatment Plant",
        "prompt": "Professional industrial photo of an Effluent Treatment Plant (ETP) system. Show multiple treatment tanks including equalization tank, aeration tank with diffusers, clarifier, filter press, chemical dosing systems, and control room. Industrial water treatment facility with pipes, pumps, and walkways. Aerial or wide angle view showing complete ETP setup. Photorealistic, industrial photography."
    },
    {
        "id": "prod-5",
        "name": "Sewage Treatment Plant 1500 LPH",
        "prompt": "Professional photo of a Sewage Treatment Plant (STP) using MBBR/SBR technology. Show cylindrical treatment tanks, aeration system, settling tank, sludge handling unit, blowers, control panel. Compact packaged STP design suitable for residential complexes. Clean industrial setting, photorealistic product photography."
    },
    {
        "id": "prod-6",
        "name": "Industrial Water Softener",
        "prompt": "Professional product photo of an Industrial Water Softener system. Show tall cylindrical FRP vessels (blue/beige color) containing resin, multiport valve on top, brine tank, piping connections, pressure gauge, flow meter. Industrial water softening equipment for boiler feed water. Clean white background, commercial product photography, photorealistic."
    },
    {
        "id": "prod-7",
        "name": "Industrial Water Chiller",
        "prompt": "Professional product photo of an Industrial Water Chiller unit. Show a large blue/grey chiller machine with condenser coils, compressor unit, water tank, digital temperature controller, inlet/outlet connections, mounted on sturdy frame. Process cooling equipment for manufacturing. Studio lighting, white background, photorealistic commercial photography."
    },
    {
        "id": "prod-8",
        "name": "SS Water Cooler",
        "prompt": "Professional product photo of a Stainless Steel Commercial Water Cooler. Show a tall standing water cooler/dispenser made of shiny SS304 stainless steel, with multiple taps/faucets, water storage tank, cooling compressor at bottom, push-button dispensers. Commercial water cooler for schools and offices. Clean white background, studio lighting, photorealistic."
    },
    {
        "id": "prod-9",
        "name": "Demineralization Plant",
        "prompt": "Professional product photo of a Demineralization (DM) Plant. Show two or more tall cylindrical vessels (cation and anion exchangers) in FRP/rubber-lined steel, multiport valves, regeneration tanks for acid and alkali, interconnecting piping, conductivity meter. Industrial DM water system. Clean factory setting, photorealistic commercial photography."
    },
    {
        "id": "prod-10",
        "name": "Swimming Pool Filtration Plant",
        "prompt": "Professional product photo of a Swimming Pool Filtration System. Show sand filter vessel (horizontal or vertical), circulation pump, chlorine dosing system, pH controller, hair and lint strainer, multiport valve, pressure gauge, complete with piping. Pool water treatment equipment with blue accents. Clean product photography, white background, photorealistic."
    }
]

async def generate_image(product):
    """Generate a single product image"""
    api_key = os.getenv("EMERGENT_LLM_KEY")
    chat = LlmChat(
        api_key=api_key, 
        session_id=f"product-{product['id']}", 
        system_message="You are a professional product photographer specializing in industrial equipment photography."
    )
    chat.with_model("gemini", "gemini-3-pro-image-preview").with_params(modalities=["image", "text"])
    
    msg = UserMessage(text=product["prompt"])
    
    try:
        text, images = await chat.send_message_multimodal_response(msg)
        
        if images:
            # Save image
            img = images[0]
            image_bytes = base64.b64decode(img['data'])
            filename = f"/app/frontend/public/products/{product['id']}.png"
            os.makedirs(os.path.dirname(filename), exist_ok=True)
            with open(filename, "wb") as f:
                f.write(image_bytes)
            print(f"✓ Generated: {product['name']} -> {filename}")
            return filename
        else:
            print(f"✗ No image generated for: {product['name']}")
            return None
    except Exception as e:
        print(f"✗ Error generating {product['name']}: {str(e)[:100]}")
        return None

async def main():
    print("=" * 60)
    print("Generating Product Images with Gemini Nano Banana")
    print("=" * 60)
    
    results = []
    for product in PRODUCTS:
        print(f"\nGenerating: {product['name']}...")
        result = await generate_image(product)
        results.append({"product": product, "file": result})
        await asyncio.sleep(2)  # Rate limiting
    
    print("\n" + "=" * 60)
    print("Generation Complete!")
    print("=" * 60)
    
    success = sum(1 for r in results if r["file"])
    print(f"Successfully generated: {success}/{len(PRODUCTS)} images")
    
    return results

if __name__ == "__main__":
    asyncio.run(main())
