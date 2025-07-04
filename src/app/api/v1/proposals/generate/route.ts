import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Simple API key validation
function validateApiKey(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const apiKey = authHeader.replace('Bearer ', '')
  return apiKey.startsWith('dcl_sk_') && apiKey.length > 10
}

export async function POST(request: Request) {
  try {
    // Validate API key
    const headersList = headers()
    const authorization = headersList.get('authorization')
    
    if (!validateApiKey(authorization)) {
      return NextResponse.json(
        { error: 'Invalid or missing API key. Please provide a valid API key in the Authorization header.' },
        { status: 401 }
      )
    }

    const { businessType, projectType, clientInfo, projectScope } = await request.json()

    // Validate required fields
    if (!businessType || !projectType) {
      return NextResponse.json(
        { error: 'Missing required fields: businessType and projectType are required.' },
        { status: 400 }
      )
    }

    // AI-powered proposal content generation
    const proposalTemplates = {
      'Software Development': {
        executiveSummary: generateExecutiveSummary('Software Development', projectType),
        projectUnderstanding: generateProjectUnderstanding('Software Development', projectType),
        proposedSolution: generateProposedSolution('Software Development', projectType),
        timeline: generateTimeline('Software Development', projectType),
        investment: generateInvestment('Software Development', projectType),
        aboutCompany: generateAboutCompany('Software Development'),
        nextSteps: generateNextSteps('Software Development')
      },
      'Design Agency': {
        executiveSummary: generateExecutiveSummary('Design Agency', projectType),
        projectUnderstanding: generateProjectUnderstanding('Design Agency', projectType),
        proposedSolution: generateProposedSolution('Design Agency', projectType),
        timeline: generateTimeline('Design Agency', projectType),
        investment: generateInvestment('Design Agency', projectType),
        aboutCompany: generateAboutCompany('Design Agency'),
        nextSteps: generateNextSteps('Design Agency')
      },
      'Marketing Agency': {
        executiveSummary: generateExecutiveSummary('Marketing Agency', projectType),
        projectUnderstanding: generateProjectUnderstanding('Marketing Agency', projectType),
        proposedSolution: generateProposedSolution('Marketing Agency', projectType),
        timeline: generateTimeline('Marketing Agency', projectType),
        investment: generateInvestment('Marketing Agency', projectType),
        aboutCompany: generateAboutCompany('Marketing Agency'),
        nextSteps: generateNextSteps('Marketing Agency')
      },
      'Consulting': {
        executiveSummary: generateExecutiveSummary('Consulting', projectType),
        projectUnderstanding: generateProjectUnderstanding('Consulting', projectType),
        proposedSolution: generateProposedSolution('Consulting', projectType),
        timeline: generateTimeline('Consulting', projectType),
        investment: generateInvestment('Consulting', projectType),
        aboutCompany: generateAboutCompany('Consulting'),
        nextSteps: generateNextSteps('Consulting')
      }
    }

    const template = proposalTemplates[businessType as keyof typeof proposalTemplates] || proposalTemplates['Consulting']
    
    const generatedProposal = {
      id: `prop_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      sections: [
        { id: '1', title: 'Executive Summary', content: template.executiveSummary },
        { id: '2', title: 'Project Understanding', content: template.projectUnderstanding },
        { id: '3', title: 'Proposed Solution', content: template.proposedSolution },
        { id: '4', title: 'Timeline & Methodology', content: template.timeline },
        { id: '5', title: 'Investment & Payment Terms', content: template.investment },
        { id: '6', title: 'About Our Company', content: template.aboutCompany },
        { id: '7', title: 'Next Steps', content: template.nextSteps }
      ],
      estimatedBudget: generateBudgetEstimate(businessType, projectType),
      timeline: generateTimelineEstimate(projectType),
      recommendations: generateRecommendations(businessType, projectType),
      createdAt: new Date().toISOString(),
      clientInfo: clientInfo || {},
      projectScope: projectScope || ''
    }

    return NextResponse.json({ 
      success: true,
      proposal: generatedProposal,
      message: 'Professional proposal generated successfully'
    })
    
  } catch (error) {
    console.error('Proposal generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate proposal. Please try again.' },
      { status: 500 }
    )
  }
}

function generateExecutiveSummary(businessType: string, projectType: string): string {
  const summaries = {
    'Software Development': {
      'Website Development': 'We are excited to present our proposal for developing a modern, responsive website that will enhance your digital presence and drive business growth. Our team of experienced developers will create a custom solution tailored to your specific needs, ensuring optimal performance, security, and user experience.',
      'Mobile App Development': 'This proposal outlines our approach to developing a cutting-edge mobile application that will provide your users with an exceptional experience across iOS and Android platforms. We focus on creating intuitive interfaces, robust functionality, and seamless performance.',
      'Software Integration': 'We propose a comprehensive software integration solution that will streamline your business processes, eliminate data silos, and improve operational efficiency. Our approach ensures minimal disruption to your current operations while maximizing the benefits of connected systems.',
      'E-commerce Platform': 'Our proposal presents a comprehensive e-commerce solution designed to maximize your online sales potential. We\'ll create a user-friendly, secure platform that drives conversions and provides an exceptional shopping experience.',
      'Custom Software': 'We propose developing custom software tailored specifically to your business needs, ensuring optimal efficiency and competitive advantage through innovative technology solutions.'
    },
    'Design Agency': {
      'Brand Identity': 'This proposal presents our strategy for creating a distinctive and memorable brand identity that will differentiate your company in the marketplace. Our comprehensive approach includes logo design, brand guidelines, and visual identity systems that resonate with your target audience.',
      'Marketing Campaign': 'We propose a multi-channel marketing campaign designed to increase brand awareness, drive engagement, and generate qualified leads. Our data-driven approach ensures maximum ROI and measurable results.',
      'Website Development': 'Our proposal outlines the creation of a visually stunning and user-friendly website that perfectly represents your brand while delivering exceptional user experience and driving conversions.',
      'UI/UX Design': 'We propose creating intuitive and engaging user interfaces that enhance user experience and drive business results through thoughtful design and user-centered approach.'
    },
    'Marketing Agency': {
      'Digital Marketing': 'Our comprehensive digital marketing strategy will increase your online presence, drive qualified traffic, and generate measurable results across multiple digital channels.',
      'SEO Campaign': 'We propose an advanced SEO strategy to improve your search engine rankings, increase organic traffic, and enhance your online visibility.',
      'Social Media Management': 'Our social media strategy will build brand awareness, engage your audience, and drive business growth through strategic content and community management.',
      'Content Marketing': 'We propose a content marketing strategy that establishes your brand as an industry leader while driving engagement and conversions.'
    },
    'Consulting': {
      'Business Consulting': 'Our business consulting approach will identify opportunities for growth, optimize operations, and develop strategic initiatives that drive sustainable business success.',
      'Digital Transformation': 'We propose a comprehensive digital transformation strategy that will modernize your operations, improve efficiency, and position your business for future growth.',
      'Process Optimization': 'Our process optimization methodology will streamline your operations, reduce costs, and improve overall business efficiency through data-driven improvements.'
    }
  }

  const businessSummaries = summaries[businessType as keyof typeof summaries]
  if (businessSummaries) {
    return businessSummaries[projectType as keyof typeof businessSummaries] || 
           'We are pleased to present this comprehensive proposal that addresses your unique business challenges and objectives. Our proven methodology and experienced team ensure successful project delivery that exceeds expectations.'
  }
  return 'We are pleased to present this comprehensive proposal that addresses your unique business challenges and objectives. Our proven methodology and experienced team ensure successful project delivery that exceeds expectations.'
}

function generateProjectUnderstanding(businessType: string, projectType: string): string {
  return `Based on our discussions and research, we understand that you are looking to ${projectType.toLowerCase()} that will address the following key objectives:

• Enhance your competitive position in the market
• Improve operational efficiency and productivity  
• Provide measurable return on investment
• Deliver a solution that scales with your business growth
• Ensure seamless integration with existing systems and processes

We recognize the importance of this project to your organization and are committed to delivering a solution that not only meets but exceeds your expectations. Our approach is designed to minimize risk while maximizing value delivery throughout the project lifecycle.`
}

function generateProposedSolution(businessType: string, projectType: string): string {
  const solutions = {
    'Software Development': `Our proposed solution follows industry best practices and includes:

**Phase 1: Discovery & Planning**
• Detailed requirements analysis and documentation
• Technical architecture design and review
• Project planning and resource allocation
• Risk assessment and mitigation strategies

**Phase 2: Development & Implementation**
• Agile development methodology with regular sprints
• Continuous integration and deployment practices
• Regular client reviews and feedback incorporation
• Comprehensive testing and quality assurance

**Phase 3: Deployment & Support**
• Production deployment and monitoring
• User training and documentation
• Ongoing support and maintenance
• Performance optimization and enhancements`,

    'Design Agency': `Our creative solution includes:

**Research & Strategy Phase**
• Competitive analysis and market research
• Target audience analysis and personas
• Brand positioning and messaging strategy
• Creative brief development

**Design & Development Phase**
• Concept development and ideation
• Design iterations and client feedback
• Final design execution and refinement
• Brand guidelines and asset creation

**Implementation & Launch**
• Asset delivery and implementation support
• Launch strategy and execution
• Performance monitoring and optimization
• Ongoing brand management support`,

    'Marketing Agency': `Our comprehensive marketing approach includes:

**Strategy & Planning Phase**
• Market research and competitive analysis
• Target audience identification and segmentation
• Channel strategy and budget allocation
• KPI definition and measurement framework

**Campaign Development & Execution**
• Creative concept development
• Content creation and asset production
• Campaign launch and optimization
• Performance monitoring and reporting

**Optimization & Growth**
• Data analysis and insights generation
• Campaign optimization and refinement
• Scaling successful initiatives
• Continuous improvement recommendations`,

    'Consulting': `Our consulting methodology includes:

**Assessment & Analysis Phase**
• Current state analysis and documentation
• Stakeholder interviews and requirements gathering
• Gap analysis and opportunity identification
• Risk assessment and mitigation planning

**Strategy Development**
• Solution design and recommendations
• Implementation roadmap creation
• Resource planning and allocation
• Change management strategy

**Implementation & Support**
• Phased implementation approach
• Training and knowledge transfer
• Progress monitoring and reporting
• Ongoing support and optimization`
  }

  return solutions[businessType as keyof typeof solutions] || 
         `Our comprehensive solution is designed to address your specific needs through a structured approach that ensures quality delivery and measurable results. We will work closely with your team throughout the process to ensure alignment with your objectives and expectations.`
}

function generateTimeline(businessType: string, projectType: string): string {
  return `**Project Timeline Overview**

Our proposed timeline ensures efficient delivery while maintaining the highest quality standards:

**Week 1-2: Project Initiation**
• Project kickoff and team onboarding
• Detailed requirements gathering
• Initial planning and setup

**Week 3-6: Primary Development Phase**
• Core development and implementation
• Regular progress reviews and updates
• Continuous client feedback integration

**Week 7-8: Testing & Refinement**
• Comprehensive testing and quality assurance
• Performance optimization
• Client review and feedback incorporation

**Week 9-10: Deployment & Launch**
• Production deployment and configuration
• User training and documentation
• Go-live support and monitoring

**Ongoing: Support & Maintenance**
• Post-launch support and optimization
• Regular performance monitoring
• Continuous improvement recommendations

*Timeline may be adjusted based on project complexity and client feedback cycles.*`
}

function generateInvestment(businessType: string, projectType: string): string {
  return `**Investment Structure**

Our transparent pricing model ensures you receive maximum value for your investment:

**Project Investment: [To be determined based on scope]**

**Payment Schedule:**
• 50% upon project commencement
• 25% at project milestone completion
• 25% upon final delivery and acceptance

**What's Included:**
• All development and implementation work
• Project management and coordination
• Regular progress reports and communication
• Testing and quality assurance
• Documentation and training materials
• 30-day post-launch support

**Additional Considerations:**
• All prices are fixed for the proposed scope
• Changes to scope may affect timeline and cost
• Payment terms: Net 15 days from invoice date
• All intellectual property transfers upon final payment`
}

function generateAboutCompany(businessType: string): string {
  return `**About DevCraft Labs**

We are a leading provider of professional AI-powered business solutions with a proven track record of delivering exceptional results for our clients. Our team combines technical expertise with creative innovation to solve complex business challenges.

**Our Expertise:**
• Over 5+ years of industry experience
• Successfully completed 100+ projects
• Specialized in AI-powered automation and business tools
• Certified professionals and industry partnerships

**Why Choose DevCraft Labs:**
• Proven methodology and best practices
• Transparent communication and reporting
• Commitment to quality and client satisfaction
• Competitive pricing and flexible engagement models
• Ongoing support and partnership approach

**Our Solutions:**
• AI Business Tools (Invoice Generation, Content Creation)
• Developer Platform (Landing Pages, Task Management)
• AEC Solutions (Revit Automation, MEP Tools)

**Client Success Stories:**
Our clients consistently achieve 40-60% efficiency improvements and significant cost savings through our AI-powered solutions.`
}

function generateNextSteps(businessType: string): string {
  return `**Next Steps**

To move forward with this project, we propose the following steps:

**1. Proposal Review (Week 1)**
• Review this proposal with your team
• Schedule a follow-up meeting for questions
• Finalize any scope adjustments

**2. Contract Execution (Week 1-2)**
• Execute project agreement
• Process initial payment
• Complete project onboarding

**3. Project Kickoff (Week 2)**
• Introduce project team members
• Establish communication protocols
• Begin discovery and planning phase

**4. Regular Communication**
• Weekly progress updates
• Scheduled milestone reviews
• Open communication channels for questions

We are excited about the opportunity to work with you on this project and are confident in our ability to deliver exceptional results. Please don't hesitate to contact us with any questions or to discuss next steps.

**Contact Information:**
Email: support@devcraft-labs.com
Website: https://devcraft-labs.com
API Documentation: https://devcraft-labs-api.vercel.app/docs

We look forward to partnering with you on this exciting project!`
}

function generateBudgetEstimate(businessType: string, projectType: string): number {
  const budgetRanges = {
    'Software Development': {
      'Website Development': [15000, 50000],
      'Mobile App Development': [25000, 75000],
      'Software Integration': [20000, 60000],
      'E-commerce Platform': [30000, 80000],
      'Custom Software': [35000, 100000]
    },
    'Design Agency': {
      'Brand Identity': [5000, 25000],
      'Marketing Campaign': [10000, 40000],
      'Website Development': [8000, 30000],
      'UI/UX Design': [12000, 35000]
    },
    'Marketing Agency': {
      'Digital Marketing': [15000, 50000],
      'SEO Campaign': [5000, 20000],
      'Social Media Management': [3000, 15000],
      'Content Marketing': [8000, 25000]
    },
    'Consulting': {
      'Business Consulting': [10000, 40000],
      'Digital Transformation': [25000, 100000],
      'Process Optimization': [8000, 30000]
    }
  }

  const businessBudgets = budgetRanges[businessType as keyof typeof budgetRanges]
  const range = businessBudgets ? (businessBudgets[projectType as keyof typeof businessBudgets] || [10000, 40000]) : [10000, 40000]
  return Math.floor((range[0] + range[1]) / 2)
}

function generateTimelineEstimate(projectType: string): string {
  const timelines = {
    'Website Development': '8-12 weeks',
    'Mobile App Development': '12-16 weeks',
    'Brand Identity': '6-8 weeks',
    'Marketing Campaign': '4-8 weeks',
    'Business Consulting': '6-12 weeks',
    'Software Integration': '10-16 weeks',
    'E-commerce Platform': '10-14 weeks',
    'Custom Software': '12-20 weeks',
    'UI/UX Design': '6-10 weeks',
    'Digital Marketing': '4-12 weeks',
    'SEO Campaign': '3-6 months',
    'Social Media Management': 'Ongoing',
    'Content Marketing': '3-6 months',
    'Digital Transformation': '16-24 weeks',
    'Process Optimization': '8-12 weeks'
  }

  return timelines[projectType as keyof typeof timelines] || '8-12 weeks'
}

function generateRecommendations(businessType: string, projectType: string): string[] {
  return [
    'Include detailed scope documentation to prevent scope creep',
    'Establish clear communication protocols and regular check-ins',
    'Consider phased approach for better risk management',
    'Plan for user acceptance testing and feedback cycles',
    'Include post-launch support and maintenance considerations',
    'Document all assumptions and dependencies clearly',
    'Establish success metrics and KPIs for project evaluation',
    'Ensure stakeholder alignment throughout the project',
    'Plan for training and knowledge transfer sessions',
    'Consider scalability and future enhancement requirements'
  ]
}