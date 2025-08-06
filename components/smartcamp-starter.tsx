"use client"

import { useState } from 'react'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { RadioGroup } from '@/components/ui/radio-group-demo'
import { Textarea } from '@/components/ui/textarea'
import { Toggle, Checkbox } from '@/components/ui/toggle'
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker'
import { useI18n } from '@/lib/i18n/context'

// Mock data for demo purposes
const DEMO_MODELS = [
  { id: 'llama-7b', name: 'Llama 7B', parameterCount: '7B parameters' },
  { id: 'llama-13b', name: 'Llama 13B', parameterCount: '13B parameters' },
  { id: 'llama-70b', name: 'Llama 70B', parameterCount: '70B parameters' },
  { id: 'mistral-7b', name: 'Mistral 7B', parameterCount: '7B parameters' },
  { id: 'codellama-34b', name: 'CodeLlama 34B', parameterCount: '34B parameters' },
]



const DEMO_DEPLOYMENT_OPTIONS = [
  { id: 'local', label: 'Local Hardware', description: 'Run on your own GPU' },
  { id: 'cloud', label: 'Cloud VPS', description: 'Rent cloud computing power' },
  { id: 'hybrid', label: 'Hybrid Setup', description: 'Combine local and cloud resources' },
]

const DEMO_PRIORITY_OPTIONS = [
  { id: 'speed', label: 'Speed Priority', description: 'Optimize for fastest inference' },
  { id: 'cost', label: 'Cost Priority', description: 'Optimize for lowest cost' },
  { id: 'quality', label: 'Quality Priority', description: 'Optimize for best output quality' },
  { id: 'balanced', label: 'Balanced', description: 'Balance between all factors' },
]



export default function SmartCampStarter() {
  const { t } = useI18n()
  const [modelId, setModelId] = useState<string>('')

  const [targetTokensPerSecond, setTargetTokensPerSecond] = useState<number[]>([20])
  const [budgetUSD, setBudgetUSD] = useState<string>('')

  const [emailForReport, setEmailForReport] = useState<string>('')
  
  // New state for additional components
  const [deploymentType, setDeploymentType] = useState<string>('')
  const [priority, setPriority] = useState<string>('')
  const [projectDescription, setProjectDescription] = useState<string>('')
  const [enableAdvanced, setEnableAdvanced] = useState(false)
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [enableAutoScale, setEnableAutoScale] = useState(false)
  const [projectStartDate, setProjectStartDate] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [memoryLimit, setMemoryLimit] = useState<number[]>([16])



  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">{t('title')}</h1>
        <p className="text-white/80 text-lg">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Elements - Interactive UI Components */}
        <div className="rounded-lg border border-white/20 shadow-sm bg-white/15 backdrop-blur" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15) !important' }}>
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">{t('elements')}</h3>
            <p className="text-sm text-white/70">Interactive UI components from our design system</p>
          </div>
          <div className="p-6 pt-0 space-y-6">
            {/* Dropdown/Select Menus */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Dropdown & Select</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('modelLabel')}</label>
                <Select
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  placeholder="Choose a model"
                >
                  {DEMO_MODELS.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} ({model.parameterCount})
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Features</label>
                <Select
                  value=""
                  onChange={() => {}}
                  placeholder="Select additional features"
                >
                  <option value="monitoring">Performance Monitoring</option>
                  <option value="backup">Automated Backups</option>
                  <option value="security">Enhanced Security</option>
                  <option value="analytics">Advanced Analytics</option>
                </Select>
              </div>
            </div>

            {/* Radio Button Groups */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Radio Buttons</h3>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">Deployment Type</label>
                <RadioGroup
                  options={DEMO_DEPLOYMENT_OPTIONS}
                  value={deploymentType}
                  onChange={setDeploymentType}
                  name="deployment"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Optimization Priority</label>
                <RadioGroup
                  options={DEMO_PRIORITY_OPTIONS}
                  value={priority}
                  onChange={setPriority}
                  name="priority"
                />
              </div>
            </div>

            {/* Text Inputs */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Text Inputs</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget (USD)</label>
                <Input
                  type="number"
                  placeholder="Enter your budget"
                  value={budgetUSD}
                  onChange={(e) => setBudgetUSD(e.target.value)}
                  min="0"
                  step="100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={emailForReport}
                  onChange={(e) => setEmailForReport(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Project Description</label>
                <Textarea
                  placeholder="Describe your project goals and requirements..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Range Sliders</h3>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Performance Target: {targetTokensPerSecond[0]} tokens/second
                </label>
                <Slider
                  value={targetTokensPerSecond}
                  onValueChange={setTargetTokensPerSecond}
                  max={50}
                  min={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 tokens/sec</span>
                  <span>50 tokens/sec</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Memory Limit: {memoryLimit[0]} GB
                </label>
                <Slider
                  value={memoryLimit}
                  onValueChange={setMemoryLimit}
                  max={64}
                  min={4}
                  step={2}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>4 GB</span>
                  <span>64 GB</span>
                </div>
              </div>
            </div>

            {/* Date Pickers */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Date Pickers</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Start Date</label>
                <DatePicker
                  value={projectStartDate}
                  onChange={setProjectStartDate}
                  placeholder="Select start date"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Analysis Period</label>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                />
              </div>
            </div>

            {/* Toggles & Checkboxes */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Toggles & Checkboxes</h3>
              
              <Toggle
                checked={enableAdvanced}
                onChange={setEnableAdvanced}
                label="Enable Advanced Options"
                description="Show additional configuration options"
              />
              
              <Toggle
                checked={enableNotifications}
                onChange={setEnableNotifications}
                label="Email Notifications"
                description="Receive updates about your project"
              />
              
              <Toggle
                checked={enableAutoScale}
                onChange={setEnableAutoScale}
                label="Auto-scaling"
                description="Automatically adjust resources based on demand"
              />
              
              <Checkbox
                checked={acceptTerms}
                onChange={setAcceptTerms}
                label="Accept Terms and Conditions"
                description="I agree to the terms of service and privacy policy"
              />
            </div>
          </div>
        </div>

        {/* Column 2: Typography */}
        <div className="rounded-lg border border-white/20 shadow-sm bg-white/15 backdrop-blur" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15) !important' }}>
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">Typography</h3>
            <p className="text-sm text-white/70">Design system typography and colors</p>
          </div>
          <div className="p-6 pt-0 space-y-6">
            {/* Typography Scale */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Typography Scale</h3>
              
              <div className="space-y-3">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1">Heading 1</h1>
                  <p className="text-xs text-white/60">text-4xl font-bold</p>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-1">Heading 2</h2>
                  <p className="text-xs text-white/60">text-3xl font-semibold</p>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-1">Heading 3</h3>
                  <p className="text-xs text-white/60">text-2xl font-medium</p>
                </div>
                <div>
                  <p className="text-base text-white/90 mb-1">Body Text - Regular paragraph text</p>
                  <p className="text-xs text-white/60">text-base text-white/90</p>
                </div>
                <div>
                  <p className="text-sm text-white/80 mb-1">Small Text - Labels and captions</p>
                  <p className="text-xs text-white/60">text-sm text-white/80</p>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Color Palette</h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-emerald-500 rounded-md flex items-center justify-center text-white font-medium text-sm">
                      Primary
                    </div>
                    <p className="text-xs text-white/60">emerald-500</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-emerald-600 rounded-md flex items-center justify-center text-white font-medium text-sm">
                      Primary Dark
                    </div>
                    <p className="text-xs text-white/60">emerald-600</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-white/20 rounded-md flex items-center justify-center text-white font-medium text-sm border border-white/30">
                      Surface
                    </div>
                    <p className="text-xs text-white/60">bg-white/20</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-white/10 rounded-md flex items-center justify-center text-white font-medium text-sm border border-white/20">
                      Background
                    </div>
                    <p className="text-xs text-white/60">bg-white/10</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing Examples */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Spacing System</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-emerald-400 rounded"></div>
                  <span className="text-sm text-white/80">8px spacing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-6 bg-emerald-400 rounded"></div>
                  <span className="text-sm text-white/80">16px spacing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-400 rounded"></div>
                  <span className="text-sm text-white/80">24px spacing</span>
                </div>
              </div>
            </div>

            {/* Button Styles */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Button Styles</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/80 mb-3">Primary Buttons</p>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-3 py-1 rounded-md text-white text-xs font-medium border border-white/30 relative overflow-hidden" style={{ backgroundImage: "url('/jungle background.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                      <div className="absolute inset-0 bg-black/40 rounded-md"></div>
                      <span className="relative z-10">Small</span>
                    </div>
                    <div className="px-4 py-2 rounded-md text-white text-sm font-medium border border-white/30 relative overflow-hidden" style={{ backgroundImage: "url('/jungle background.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                      <div className="absolute inset-0 bg-black/40 rounded-md"></div>
                      <span className="relative z-10">Medium</span>
                    </div>
                    <div className="px-6 py-3 rounded-md text-white text-base font-medium border border-white/30 relative overflow-hidden" style={{ backgroundImage: "url('/jungle background.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                      <div className="absolute inset-0 bg-black/40 rounded-md"></div>
                      <span className="relative z-10">Large</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-2">variant=&quot;jungle&quot; | jungle background</p>
                </div>
                
                <div>
                  <p className="text-sm text-white/80 mb-3">Outline Buttons</p>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 border border-white/30 rounded-md text-white text-sm font-medium">
                      Default
                    </div>
                    <div className="px-4 py-2 border border-emerald-400/50 rounded-md text-emerald-300 text-sm font-medium">
                      Accent
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-2">variant=&quot;outline&quot; | transparent with border</p>
                </div>
                
                <div>
                  <p className="text-sm text-white/80 mb-3">Secondary & States</p>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-blue-600 rounded-md text-white text-sm font-medium">
                      Secondary
                    </div>
                    <div className="px-4 py-2 bg-white/20 rounded-md text-white/50 text-sm font-medium">
                      Disabled
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-2">Custom colors and disabled state</p>
                </div>
              </div>
            </div>

            {/* Border Radius */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Border Radius</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="w-full h-10 bg-emerald-500/20 border border-emerald-400/50 rounded-sm flex items-center justify-center">
                    <span className="text-xs text-white">rounded-sm</span>
                  </div>
                  <p className="text-xs text-white/60 text-center">2px</p>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-10 bg-emerald-500/20 border border-emerald-400/50 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-white">rounded-lg</span>
                  </div>
                  <p className="text-xs text-white/60 text-center">8px</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
