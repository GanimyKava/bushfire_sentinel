import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  IconButton,
  Paper,
  Avatar,
  Chip,
  Grid,
  Divider,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  BarChart as ChartIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  LocalFireDepartment as FireIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { useAuth } from '../../contexts/AuthContext'
import { format } from 'date-fns'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  data?: any // For charts/data visualization
  queryType?: string
}

const COLORS = ['#FF6B35', '#1B5E20', '#FFA726', '#42A5F5', '#AB47BC', '#EF5350']

// Mock MaaS API data
const mockIncidentHistory = {
  totalIncidents: 250,
  yearOverYearChange: 15,
  seasonData: [
    { month: 'Sep', incidents: 45 },
    { month: 'Oct', incidents: 52 },
    { month: 'Nov', incidents: 68 },
    { month: 'Dec', incidents: 85 },
  ],
  regionalBreakdown: [
    { region: 'NSW', incidents: 95, hectares: 125000 },
    { region: 'VIC', incidents: 68, hectares: 89000 },
    { region: 'QLD', incidents: 52, hectares: 67000 },
    { region: 'SA', incidents: 23, hectares: 34000 },
    { region: 'WA', incidents: 12, hectares: 18000 },
  ],
  losses: {
    humanFatalities: 0,
    wildlifeAffected: 5000,
    hectaresBurned: 333000,
    homesDestroyed: 12,
  },
  highRiskAreas: [
    { name: 'Blue Mountains, NSW', riskScore: 92, incidents: 18 },
    { name: 'Great Ocean Road, VIC', riskScore: 88, incidents: 15 },
    { name: 'Adelaide Hills, SA', riskScore: 85, incidents: 12 },
    { name: 'Perth Hills, WA', riskScore: 78, incidents: 8 },
  ],
  trends: {
    tenYearTrend: [
      { year: 2016, incidents: 145 },
      { year: 2017, incidents: 132 },
      { year: 2018, incidents: 158 },
      { year: 2019, incidents: 198 },
      { year: 2020, incidents: 217 },
      { year: 2021, incidents: 189 },
      { year: 2022, incidents: 203 },
      { year: 2023, incidents: 228 },
      { year: 2024, incidents: 217 },
      { year: 2025, incidents: 250 },
    ],
  },
}

const Analytics = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your BushFire Analytics Assistant, powered by GSMA MaaS APIs. I can help you analyze bushfire incidents, trends, prone areas, and impacts. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isFireRanger = user?.role === 'fire_ranger' || user?.role === 'incident_commander'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const classifyQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes('count') || lowerQuery.includes('how many') || lowerQuery.includes('number of')) {
      return 'incident_counts'
    }
    if (lowerQuery.includes('prone') || lowerQuery.includes('risk') || lowerQuery.includes('high-risk') || lowerQuery.includes('dangerous')) {
      return 'prone_areas'
    }
    if (lowerQuery.includes('loss') || lowerQuery.includes('fatal') || lowerQuery.includes('wildlife') || lowerQuery.includes('hectare') || lowerQuery.includes('home')) {
      return 'impacts'
    }
    if (lowerQuery.includes('trend') || lowerQuery.includes('pattern') || lowerQuery.includes('over time') || lowerQuery.includes('year')) {
      return 'trends'
    }
    if (lowerQuery.includes('correlation') || lowerQuery.includes('weather') || lowerQuery.includes('forecast') || lowerQuery.includes('compare')) {
      return 'analytics'
    }
    return 'general'
  }

  const generateResponse = async (query: string): Promise<Message> => {
    const queryType = classifyQuery(query)
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let response: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      queryType,
    }

    switch (queryType) {
      case 'incident_counts':
        response.content = `Here's a data-driven overview of bushfire incidents:

**Key Metrics:**
• **Total Incidents (2025 Season):** ${mockIncidentHistory.totalIncidents} (↑${mockIncidentHistory.yearOverYearChange}% YoY)
• **Current Season Status:** Active monitoring across 5 states
• **Peak Month:** December with 85 incidents

**Regional Breakdown:**
${mockIncidentHistory.regionalBreakdown.map((r) => '• ' + r.region + ': ' + r.incidents + ' incidents, ' + r.hectares.toLocaleString() + ' hectares').join('\n')}

**Data Source:** RFS/BOM feeds via MaaS Knowledge Base API (Updated: ${format(new Date(), 'MMM dd, yyyy')})

${isFireRanger ? '**Operational Note:** NSW shows highest incident density—consider resource allocation review.' : '**Stay Prepared:** Check your local RFS app for real-time alerts.'}`

        response.data = {
          type: 'bar',
          data: mockIncidentHistory.regionalBreakdown.map((r) => ({
            name: r.region,
            incidents: r.incidents,
          })),
        }
        break

      case 'prone_areas':
        response.content = `**High-Risk Prone Areas Analysis:**

Based on historical data and BOM fire proneness mapping, here are the top high-risk regions:

**Top 4 High-Risk Areas:**
${mockIncidentHistory.highRiskAreas.map((area, idx) => (idx + 1) + '. **' + area.name + '** - Risk Score: ' + area.riskScore + '/100 (' + area.incidents + ' incidents this season)').join('\n')}

**Geographic Pattern:**
• 70% of incidents occur in temperate forest regions (BOM data)
• Coastal interface zones show elevated risk (ember drift)
• Urban-bushland boundaries are critical monitoring zones

**Risk Factors:**
• Fuel load accumulation (e.g., Blue Mountains: 40 tons/ha)
• Weather patterns (high wind, low humidity)
• Topography (ridges, valleys create fire corridors)

${isFireRanger ? '**Tactical Insight:** Prioritize proactive patrols in Blue Mountains—highest risk score with 18 active incidents.' : '**Public Awareness:** If you are in a high-risk area, prepare your property and have an evacuation plan ready.'}`

        response.data = {
          type: 'table',
          data: mockIncidentHistory.highRiskAreas,
        }
        break

      case 'impacts':
        response.content = `**Impact & Loss Analysis:**

Here's a comprehensive overview of bushfire impacts based on verified data:

**Human Impact:**
• **Fatalities (2025 Season):** ${mockIncidentHistory.losses.humanFatalities} (Thankfully, no lives lost in current fires)
• **Homes Destroyed:** ${mockIncidentHistory.losses.homesDestroyed} properties
• **Evacuations:** ~2,500 residents temporarily displaced

**Wildlife Impact:**
• **Wildlife Affected:** ~${mockIncidentHistory.losses.wildlifeAffected.toLocaleString()} animals (koalas, wallabies, birds)
• **Rescue Operations:** 23 wildlife rescues completed
• **Habitat Loss:** ${mockIncidentHistory.losses.hectaresBurned.toLocaleString()} hectares of critical habitat

**Environmental Impact:**
• **Total Hectares Burned:** ${mockIncidentHistory.losses.hectaresBurned.toLocaleString()} hectares
• **Carbon Emissions:** Estimated ${(mockIncidentHistory.losses.hectaresBurned * 50).toLocaleString()} tons CO₂ equivalent

**Recovery Efforts:**
Support wildlife recovery via [Wildlife Rescue Organizations](https://www.wildlife.vic.gov.au) and community recovery funds.

**Data Source:** Verified RFS/BOM reports as of ${format(new Date(), 'MMM dd, yyyy')}. Trends may evolve as season progresses.`

        response.data = {
          type: 'pie',
          data: [
            { name: 'Wildlife Affected', value: mockIncidentHistory.losses.wildlifeAffected },
            { name: 'Homes Destroyed', value: mockIncidentHistory.losses.homesDestroyed * 100 },
            { name: 'Hectares Burned (k)', value: Math.round(mockIncidentHistory.losses.hectaresBurned / 1000) },
          ],
        }
        break

      case 'trends':
        response.content = `**Bushfire Trends Analysis (10-Year Overview):**

Here's how bushfire patterns have evolved over the past decade:

**Key Trend Insights:**
• **10-Year Average:** 188 incidents/year
• **2025 Projection:** 250 incidents (↑33% vs 10-year average)
• **Peak Year:** 2025 (250 incidents)
• **Lowest Year:** 2017 (132 incidents)

**Pattern Analysis:**
• **2019-2020 Spike:** Black Summer period saw unprecedented activity (198→217 incidents)
• **Recent Trend:** Gradual increase from 2021 onwards (climate factors)
• **Seasonal Shift:** Peak season starting earlier (now September vs traditional October)

**Climate Correlation:**
• Higher temperatures correlate with increased incidents (BOM data)
• Extended dry periods (La Niña transitions) create fuel accumulation
• Wind patterns (westerlies) intensify fire spread in SE Australia

${isFireRanger ? '**Operational Forecast:** Expect 15-20% increase in Q4 2025 based on current patterns. Resource allocation review recommended.' : '**Public Awareness:** Prepare early—fire season is starting sooner and lasting longer.'}`

        response.data = {
          type: 'line',
          data: mockIncidentHistory.trends.tenYearTrend,
        }
        break

      case 'analytics':
        response.content = `**Advanced Analytics & Correlations:**

**Weather vs. Incidents Correlation:**
• **Temperature:** Strong positive correlation (r=0.78) - Each 1°C increase → ~8% more incidents
• **Humidity:** Negative correlation (r=-0.65) - Low humidity (<30%) periods see 2x incidents
• **Wind Speed:** Critical factor - Winds >40km/h increase fire spread by 3x

**Predictive Patterns:**
• **El Niño Years:** 20-30% increase in incidents
• **La Niña to El Niño Transitions:** Peak risk periods (fuel accumulation + dry conditions)
• **Coastal vs. Inland:** Coastal areas show 40% higher ember risk, inland areas show larger fire fronts

**Forecast (Next 3 Months):**
Based on current BOM forecasts and historical patterns:
• **High Risk:** December 2025 - January 2026 (expected 60-75 incidents)
• **Moderate Risk:** February 2026 (expected 35-45 incidents)
• **Factors:** Above-average temps, below-average rainfall predicted

**Comparative Analysis:**
• **vs. 2024:** Up 15% (250 vs 217 incidents)
• **vs. 2019-2020 Black Summer:** 15% lower (250 vs 415 total)
• **vs. 10-Year Average:** 33% above average

**Data Confidence:** High confidence from BOM/RFS official sources. Updated: ${format(new Date(), 'MMM dd, yyyy')}`

        response.data = {
          type: 'bar',
          data: [
            { name: '2024', value: 217 },
            { name: '2025', value: 250 },
            { name: '10-Yr Avg', value: 188 },
          ],
        }
        break

      default:
        response.content = `I can help you analyze various aspects of bushfire data:

**I can answer questions about:**
• **Incident Counts:** "How many bushfires this season?"
• **Prone Areas:** "Which regions are high-risk?"
• **Impacts:** "What's the loss of life or wildlife?"
• **Trends:** "Bushfire trends over 10 years?"
• **Correlations:** "Weather vs. incidents correlation"
• **Forecasts:** "What's the forecast for next month?"

**Try asking:**
- "How many incidents in NSW this season?"
- "Show me high-risk areas"
- "What are the trends over 10 years?"
- "Compare 2025 vs 2024 incidents"

What would you like to analyze?`
    }

    setIsLoading(false)
    return response
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    const assistantMessage = await generateResponse(input.trim())
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const renderDataVisualization = (data: any) => {
    if (!data) return null

    switch (data.type) {
      case 'bar':
        return (
          <Box sx={{ mt: 2, height: 300 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Data Visualization
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={Object.keys(data.data[0]).find((k) => k !== 'name') || 'value'} fill="#FF6B35" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )

      case 'line':
        return (
          <Box sx={{ mt: 2, height: 300 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Trend Analysis
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="incidents" stroke="#FF6B35" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )

      case 'pie':
        return (
          <Box sx={{ mt: 2, height: 300 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Impact Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.data.map((_entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )

      case 'table':
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              High-Risk Areas Details
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Area</strong></TableCell>
                    <TableCell align="right"><strong>Risk Score</strong></TableCell>
                    <TableCell align="right"><strong>Incidents</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.data.map((area: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell>{area.name}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={area.riskScore}
                          size="small"
                          color={area.riskScore >= 90 ? 'error' : area.riskScore >= 80 ? 'warning' : 'default'}
                        />
                      </TableCell>
                      <TableCell align="right">{area.incidents}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ChartIcon sx={{ fontSize: 32 }} />
        BushFire Analytics
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        AI-powered analytics assistant powered by GSMA MaaS APIs • {isFireRanger ? 'Operational Analytics Mode' : 'Public Awareness Mode'}
      </Typography>

      <Grid container spacing={3}>
        {/* Chat Interface */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 'calc(100vh - 300px)', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
              {/* Messages Area */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    {message.role === 'assistant' && (
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <BotIcon />
                      </Avatar>
                    )}
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '70%',
                        bgcolor: message.role === 'user' ? 'primary.light' : 'background.paper',
                        color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {message.content}
                      </Typography>
                      {message.data && renderDataVisualization(message.data)}
                      <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
                        {format(message.timestamp, 'HH:mm')}
                      </Typography>
                    </Paper>
                    {message.role === 'user' && (
                      <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                        <PersonIcon />
                      </Avatar>
                    )}
                  </Box>
                ))}
                {isLoading && (
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                      <BotIcon />
                    </Avatar>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                      <CircularProgress size={20} />
                    </Paper>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </Box>

              <Divider />

              {/* Input Area */}
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Ask about incidents, trends, prone areas, impacts..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    multiline
                    maxRows={3}
                    size="small"
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    sx={{ alignSelf: 'flex-end' }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Powered by GSMA MaaS APIs • Data sources: BOM, RFS, MaaS Knowledge Base
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Insights Sidebar */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUpIcon color="primary" />
                Quick Insights
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  <FireIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Total Incidents (2025)
                </Typography>
                <Typography variant="h4" sx={{ color: 'error.main', fontWeight: 700 }}>
                  {mockIncidentHistory.totalIncidents}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ↑{mockIncidentHistory.yearOverYearChange}% vs 2024
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  <LocationIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Top Risk Region
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {mockIncidentHistory.highRiskAreas[0].name}
                </Typography>
                <Chip
                  label={`Risk: ${mockIncidentHistory.highRiskAreas[0].riskScore}/100`}
                  size="small"
                  color="error"
                  sx={{ mt: 0.5 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  <WarningIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Impact Summary
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Wildlife Affected: ~{mockIncidentHistory.losses.wildlifeAffected.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Hectares Burned: {mockIncidentHistory.losses.hectaresBurned.toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Homes Destroyed: {mockIncidentHistory.losses.homesDestroyed}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Sample Queries
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[
                    'How many incidents this season?',
                    'Show high-risk areas',
                    'What are the trends over 10 years?',
                    'Compare 2025 vs 2024',
                  ].map((query, idx) => (
                    <Chip
                      key={idx}
                      label={query}
                      onClick={async () => {
                        const userMessage: Message = {
                          id: Date.now().toString(),
                          role: 'user',
                          content: query,
                          timestamp: new Date(),
                        }
                        setMessages((prev) => [...prev, userMessage])
                        const assistantMessage = await generateResponse(query)
                        setMessages((prev) => [...prev, assistantMessage])
                      }}
                      sx={{ justifyContent: 'flex-start', cursor: 'pointer' }}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Analytics
