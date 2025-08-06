PRD: LLM Hardware Calculator (MVP)
Minimal Viable Product
Product Overview
Name: LLM Spec Calculator
Goal: Help users determine what hardware they need to run specific LLM models locally
Target User: AI enthusiasts wanting to run models like Llama locally
Core Problem
"I want to run Llama 70B with Q4 quantization at 20 tokens/second but don't know what hardware to buy."
MVP Features (Must-Have Only)
1. Simple Calculator Interface

Model Selection: Dropdown with 5 popular models

Llama 7B, 13B, 70B
Mistral 7B
CodeLlama 34B


Quantization: Radio buttons for Q4, Q8, FP16
Target Performance: Slider for tokens/second (5-50)

2. Hardware Requirements Display

RAM Required: Show minimum GB needed
VRAM Required: Show minimum GPU memory
GPU Recommendations: List 3-5 specific GPU models
Estimated Performance: Show expected tokens/second for each GPU

3. Simple Cost Estimates

Hardware Costs: Static pricing for recommended GPUs
VPS Alternative: Show 2-3 VPS options with monthly costs
Budget Filter: Show only options under user's budget (input field)

User Flow

User selects model from dropdown
User picks quantization level
User sets desired tokens/second
User enters budget limit
Page shows hardware requirements + recommendations
User sees local vs VPS cost comparison

Technical Specs

Frontend: Single page application
Data: Static JSON file with model specs and hardware data
No Backend: Client-side calculations only
No APIs: Manual pricing data, updated weekly

Data Requirements

Model specifications (size, memory requirements)
GPU specifications (VRAM, performance benchmarks)
Basic pricing data for 10-15 GPUs
3-4 VPS providers with pricing

Success Criteria

User can get hardware recommendation in under 30 seconds
Recommendations are within ±20% accuracy
Page loads in under 2 seconds

Out of Scope (For Later)

Real-time pricing
User accounts
Community features
Advanced filtering
Mobile optimization
More than 5 models

Launch Timeline
Week 1-2: Core calculator logic + UI
Week 3: Hardware database + recommendations
Week 4: Polish + testing
Total: 4 weeks to MVP launch
Key Assumptions

Static data is sufficient for MVP validation
Users prioritize simplicity over comprehensive options
Manual pricing updates weekly are acceptable
Desktop-first experience is fine for initial users

This MVP validates the core value proposition: "Can we help users make hardware decisions for LLM deployment?" Everything else is iteration.