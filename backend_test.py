#!/usr/bin/env python3
"""
Backend API Test Suite for Vivid H2O Solutions
Tests all API endpoints: products, services, testimonials, company, inquiries
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class VividH2OAPITester:
    def __init__(self, base_url="https://vivid-h2o-preview.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name}: PASSED")
        else:
            print(f"❌ {test_name}: FAILED - {details}")
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details,
            "response_data": response_data if success else None,
            "timestamp": datetime.now().isoformat()
        })

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int = 200, 
                 data: Dict = None, validate_func=None) -> tuple:
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            response_data = None
            
            if success:
                try:
                    response_data = response.json()
                    if validate_func:
                        validation_result = validate_func(response_data)
                        if not validation_result:
                            success = False
                            details = "Response validation failed"
                        else:
                            details = f"Status: {response.status_code}, Items: {len(response_data) if isinstance(response_data, list) else 'N/A'}"
                    else:
                        details = f"Status: {response.status_code}"
                except json.JSONDecodeError:
                    success = False
                    details = f"Invalid JSON response, Status: {response.status_code}"
            else:
                details = f"Expected {expected_status}, got {response.status_code}"

            self.log_test(name, success, details, response_data)
            return success, response_data

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, None

    def validate_products(self, data):
        """Validate products API response"""
        if not isinstance(data, list):
            return False
        
        if len(data) == 0:
            return False
            
        # Check first product structure
        product = data[0]
        required_fields = ['id', 'name', 'slug', 'category', 'description', 'short_description', 
                          'specifications', 'image_url', 'features']
        
        for field in required_fields:
            if field not in product:
                print(f"Missing field in product: {field}")
                return False
        
        return True

    def validate_services(self, data):
        """Validate services API response"""
        if not isinstance(data, list):
            return False
            
        if len(data) == 0:
            return False
            
        service = data[0]
        required_fields = ['id', 'name', 'slug', 'description', 'short_description', 
                          'icon', 'features', 'image_url']
        
        for field in required_fields:
            if field not in service:
                print(f"Missing field in service: {field}")
                return False
        
        return True

    def validate_testimonials(self, data):
        """Validate testimonials API response"""
        if not isinstance(data, list):
            return False
            
        if len(data) == 0:
            return False
            
        testimonial = data[0]
        required_fields = ['id', 'name', 'company', 'role', 'content', 'rating']
        
        for field in required_fields:
            if field not in testimonial:
                print(f"Missing field in testimonial: {field}")
                return False
        
        return True

    def validate_company_info(self, data):
        """Validate company info API response"""
        required_fields = ['name', 'tagline', 'description', 'address', 'phone', 
                          'email', 'gst', 'established', 'proprietor']
        
        for field in required_fields:
            if field not in data:
                print(f"Missing field in company info: {field}")
                return False
        
        return True

    def validate_categories(self, data):
        """Validate product categories API response"""
        if 'categories' not in data:
            return False
        
        categories = data['categories']
        if not isinstance(categories, list) or len(categories) == 0:
            return False
            
        return True

    def test_health_endpoints(self):
        """Test basic health endpoints"""
        print("\n🔍 Testing Health Endpoints...")
        
        # Test root endpoint
        self.run_test("API Root", "GET", "", 200)
        
        # Test health endpoint
        self.run_test("Health Check", "GET", "health", 200)

    def test_products_endpoints(self):
        """Test all product-related endpoints"""
        print("\n🔍 Testing Product Endpoints...")
        
        # Test get all products
        success, products = self.run_test("Get All Products", "GET", "products", 200, 
                                         validate_func=self.validate_products)
        
        if success and products:
            # Test category filter
            categories = set(product['category'] for product in products)
            if categories:
                first_category = list(categories)[0]
                self.run_test(f"Filter Products by Category ({first_category})", 
                            "GET", f"products?category={first_category}", 200)
            
            # Test featured products filter
            self.run_test("Get Featured Products", "GET", "products?featured=true", 200)
            
            # Test product by slug
            first_product = products[0]
            self.run_test(f"Get Product by Slug ({first_product['slug']})", 
                        "GET", f"products/{first_product['slug']}", 200)
        
        # Test product categories
        self.run_test("Get Product Categories", "GET", "products/categories", 200,
                     validate_func=self.validate_categories)
        
        # Test invalid product slug
        self.run_test("Get Invalid Product", "GET", "products/invalid-slug", 404)

    def test_services_endpoints(self):
        """Test services endpoints"""
        print("\n🔍 Testing Services Endpoints...")
        
        # Test get all services
        success, services = self.run_test("Get All Services", "GET", "services", 200,
                                        validate_func=self.validate_services)
        
        if success and services:
            # Test service by slug
            first_service = services[0]
            self.run_test(f"Get Service by Slug ({first_service['slug']})",
                        "GET", f"services/{first_service['slug']}", 200)
        
        # Test invalid service slug
        self.run_test("Get Invalid Service", "GET", "services/invalid-slug", 404)

    def test_testimonials_endpoint(self):
        """Test testimonials endpoint"""
        print("\n🔍 Testing Testimonials Endpoint...")
        
        self.run_test("Get All Testimonials", "GET", "testimonials", 200,
                     validate_func=self.validate_testimonials)

    def test_company_endpoint(self):
        """Test company info endpoint"""
        print("\n🔍 Testing Company Info Endpoint...")
        
        self.run_test("Get Company Info", "GET", "company", 200,
                     validate_func=self.validate_company_info)

    def test_inquiries_endpoint(self):
        """Test inquiries endpoint"""
        print("\n🔍 Testing Inquiries Endpoint...")
        
        # Test valid inquiry submission
        valid_inquiry = {
            "name": "Test User",
            "email": "test@example.com", 
            "phone": "9876543210",
            "company": "Test Company",
            "message": "This is a test inquiry",
            "inquiry_type": "general"
        }
        
        self.run_test("Submit Valid Inquiry", "POST", "inquiries", 200, data=valid_inquiry)
        
        # Test inquiry with product_id
        product_inquiry = {
            "name": "Product Test User",
            "email": "product@example.com",
            "phone": "9876543211", 
            "company": "Product Test Co",
            "product_id": "prod-1",
            "message": "Inquiry about product",
            "inquiry_type": "product"
        }
        
        self.run_test("Submit Product Inquiry", "POST", "inquiries", 200, data=product_inquiry)
        
        # Test inquiry with service_id
        service_inquiry = {
            "name": "Service Test User", 
            "email": "service@example.com",
            "phone": "9876543212",
            "service_id": "serv-1",
            "message": "Inquiry about service",
            "inquiry_type": "service"
        }
        
        self.run_test("Submit Service Inquiry", "POST", "inquiries", 200, data=service_inquiry)
        
        # Test invalid inquiry (missing required fields)
        invalid_inquiry = {
            "name": "Invalid User"
            # Missing email, phone, message
        }
        
        self.run_test("Submit Invalid Inquiry", "POST", "inquiries", 422, data=invalid_inquiry)

    def run_all_tests(self):
        """Run complete test suite"""
        print("🚀 Starting Vivid H2O Solutions API Test Suite")
        print(f"🔗 Testing Base URL: {self.base_url}")
        print("=" * 60)
        
        # Run all test categories
        self.test_health_endpoints()
        self.test_products_endpoints()
        self.test_services_endpoints()
        self.test_testimonials_endpoint() 
        self.test_company_endpoint()
        self.test_inquiries_endpoint()
        
        # Print final results
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print(f"✅ Tests Passed: {self.tests_passed}/{self.tests_run}")
        print(f"❌ Tests Failed: {self.tests_run - self.tests_passed}/{self.tests_run}")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed! Backend API is fully functional.")
            return 0
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return 1

def main():
    """Main function to run all tests"""
    tester = VividH2OAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)