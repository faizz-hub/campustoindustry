import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def build_sih_official_deck():
    prs = Presentation()
    # 16:9 Widescreen to match SIH 2026 template
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Official SIH Color Palette
    COLOR_WHITE = RGBColor(255, 255, 255)
    COLOR_DARK_TEXT = RGBColor(15, 23, 42)     # Slate-900
    COLOR_BODY_TEXT = RGBColor(51, 65, 85)     # Slate-700
    COLOR_MUTED_TEXT = RGBColor(100, 116, 139) # Slate-500
    COLOR_PRIMARY_BLUE = RGBColor(14, 116, 144)# Teal/Cyan Dark
    COLOR_SIH_BLUE = RGBColor(29, 78, 216)     # Royal Blue
    COLOR_FOOTER_BLUE = RGBColor(2, 132, 199)  # Light Blue
    COLOR_CARD_BG = RGBColor(248, 250, 252)    # Slate-50
    COLOR_CARD_BORDER = RGBColor(226, 232, 240)# Slate-200
    COLOR_HIGHLIGHT_BLUE = RGBColor(239, 246, 255)
    COLOR_LINK_BLUE = RGBColor(37, 99, 235)
    COLOR_AMBER = RGBColor(217, 119, 6)
    COLOR_GREEN = RGBColor(22, 101, 52)
    COLOR_GREEN_BG = RGBColor(240, 253, 244)

    def draw_top_right_sih_badge(slide):
        # SIH Emblem Box (Bulb / Tech Badge)
        badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(11.1), Inches(0.25), Inches(1.8), Inches(0.9))
        badge.fill.solid()
        badge.fill.fore_color.rgb = RGBColor(255, 255, 255)
        badge.line.color.rgb = RGBColor(203, 213, 225)
        badge.line.width = Pt(1)

        tb = slide.shapes.add_textbox(Inches(11.1), Inches(0.28), Inches(1.8), Inches(0.85))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = "SMART INDIA\nHACKATHON 2026"
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = COLOR_SIH_BLUE
        
        p2 = tf.add_paragraph()
        p2.alignment = PP_ALIGN.CENTER
        p2.text = "SIH26044"
        p2.font.size = Pt(8)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_AMBER

    def draw_top_left_pill(slide, title="Campus2Industry"):
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(0.35), Inches(2.2), Inches(0.48))
        pill.fill.solid()
        pill.fill.fore_color.rgb = RGBColor(255, 255, 255)
        pill.line.color.rgb = RGBColor(148, 163, 184)
        pill.line.width = Pt(1)
        
        tb = slide.shapes.add_textbox(Inches(0.6), Inches(0.35), Inches(2.2), Inches(0.48))
        tf = tb.text_frame
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = title
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = COLOR_DARK_TEXT

    def draw_slide_title(slide, title_text):
        tb = slide.shapes.add_textbox(Inches(3.2), Inches(0.28), Inches(7.5), Inches(0.75))
        tf = tb.text_frame
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = title_text
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = COLOR_DARK_TEXT

    def draw_footer_bar(slide, slide_num):
        # Official Blue Footer Bar
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(3.8), Inches(6.92), Inches(5.8), Inches(0.55))
        bar.fill.solid()
        bar.fill.fore_color.rgb = COLOR_FOOTER_BLUE
        bar.line.fill.background()

        tb = slide.shapes.add_textbox(Inches(3.8), Inches(6.95), Inches(5.8), Inches(0.5))
        tf = tb.text_frame
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = "@SIH Idea submission- Template"
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = COLOR_WHITE

        # Slide Number Box
        s_box = slide.shapes.add_textbox(Inches(12.2), Inches(6.88), Inches(0.8), Inches(0.55))
        s_tf = s_box.text_frame
        sp = s_tf.paragraphs[0]
        sp.alignment = PP_ALIGN.RIGHT
        sp.text = str(slide_num)
        sp.font.size = Pt(14)
        sp.font.bold = True
        sp.font.color.rgb = COLOR_SIH_BLUE

    # ==========================================
    # SLIDE 1: COVER SLIDE
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    
    # Background
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = COLOR_WHITE
    bg1.line.fill.background()

    # Top SIH Emblem
    draw_top_right_sih_badge(s1)

    # Top Headings
    tb_title = s1.shapes.add_textbox(Inches(1.5), Inches(0.6), Inches(10.3), Inches(1.5))
    tf_title = tb_title.text_frame
    p = tf_title.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "SMART INDIA HACKATHON 2026"
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    
    p2 = tf_title.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = "CAMPUS2INDUSTRY"
    p2.font.size = Pt(24)
    p2.font.bold = True
    p2.font.color.rgb = RGBColor(148, 163, 184) # subtle gray watermark style

    # Left Container with metadata
    meta_box = s1.shapes.add_textbox(Inches(0.8), Inches(2.2), Inches(7.2), Inches(4.8))
    tf_m = meta_box.text_frame
    tf_m.word_wrap = True

    meta_items = [
        ("Problem Statement ID –", " SIH26044"),
        ("Problem Statement Title –", " Portal for Academia -\nIndustry collaboration for Skill Mapping, Internships and\nPlacement"),
        ("Theme –", " Smart Automation"),
        ("PS Category –", " Software"),
        ("Team ID –", " [Enter Registered Team ID]"),
        ("Team Name –", " Campus2Industry  (Team & App Name Unified)"),
    ]
    for idx, (label, val) in enumerate(meta_items):
        pm = tf_m.add_paragraph() if idx > 0 else tf_m.paragraphs[0]
        pm.space_after = Pt(8)
        r1 = pm.add_run()
        r1.text = label
        r1.font.bold = True
        r1.font.size = Pt(14)
        r1.font.color.rgb = COLOR_DARK_TEXT

        r2 = pm.add_run()
        r2.text = val
        r2.font.size = Pt(13.5)
        r2.font.color.rgb = COLOR_BODY_TEXT

    # Right Graphic: Clean vector emblem container for SIH Brain / Tech Symbol
    r_card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.5), Inches(2.3), Inches(4.2), Inches(4.5))
    r_card.fill.solid()
    r_card.fill.fore_color.rgb = COLOR_CARD_BG
    r_card.line.color.rgb = COLOR_SIH_BLUE
    r_card.line.width = Pt(1.5)

    r_tb = s1.shapes.add_textbox(Inches(8.7), Inches(2.5), Inches(3.8), Inches(4.0))
    rtf = r_tb.text_frame
    rtf.word_wrap = True
    rp1 = rtf.paragraphs[0]
    rp1.alignment = PP_ALIGN.CENTER
    rp1.text = "CAMPUS2INDUSTRY"
    rp1.font.size = Pt(16)
    rp1.font.bold = True
    rp1.font.color.rgb = COLOR_SIH_BLUE

    rp2 = rtf.add_paragraph()
    rp2.alignment = PP_ALIGN.CENTER
    rp2.text = "Autonomous Career-Readiness & Verified Talent Pipeline"
    rp2.font.size = Pt(11)
    rp2.font.color.rgb = COLOR_MUTED_TEXT
    rp2.space_after = Pt(14)

    # Core Value Points
    bullets = [
        "🎯 AI 4-Year Progressive Career Milestone Engine",
        "📄 Real-time ATS Resume Builder & Analyzer",
        "📊 Dynamic Skill Gap & Explainable Matching",
        "💼 Live Opportunities, Notes & Cheat Sheets Portal"
    ]
    for b in bullets:
        bp = rtf.add_paragraph()
        bp.text = b
        bp.font.size = Pt(11)
        bp.font.bold = True
        bp.font.color.rgb = COLOR_DARK_TEXT
        bp.space_after = Pt(6)

    # ==========================================
    # SLIDE 2: IDEA TITLE & PROPOSED SOLUTION
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    draw_top_left_pill(s2)
    draw_slide_title(s2, "IDEA TITLE")
    draw_top_right_sih_badge(s2)
    draw_footer_bar(s2, 2)

    # Left Container: Idea Details & Solution
    card_l2 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.3), Inches(6.0), Inches(5.4))
    card_l2.fill.solid()
    card_l2.fill.fore_color.rgb = COLOR_CARD_BG
    card_l2.line.color.rgb = COLOR_CARD_BORDER

    tb_l2 = s2.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.1))
    tf_l2 = tb_l2.text_frame
    tf_l2.word_wrap = True

    p = tf_l2.paragraphs[0]
    p.text = "IDEA: Campus2Industry"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_after = Pt(6)

    p = tf_l2.add_paragraph()
    p.text = "Proposed Solution"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK_TEXT

    p_body = tf_l2.add_paragraph()
    p_body.text = "• AI-powered 4-year career-readiness ecosystem connecting academics, verified skills, real projects, internships, assessments, and placements into one single pane of glass.\n• Structured Student Journey: ORIENT (Y1) → DISCOVER (Y2) → BUILD (Y3) → PRACTICE (Y3.5) → DEPLOY (Y4 Placement)."
    p_body.font.size = Pt(11)
    p_body.font.color.rgb = COLOR_BODY_TEXT
    p_body.space_after = Pt(10)

    p = tf_l2.add_paragraph()
    p.text = "How It Addresses the Problem"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK_TEXT

    p_body2 = tf_l2.add_paragraph()
    p_body2.text = "• Common Skill Taxonomy: Bridges the gap between static university curriculum and rapid industry changes.\n• Objective Diagnostics: Real-time identification of what a student knows, what exact skills are missing, and the next remediation step.\n• Automated Role Matching: Matches students with curated live internships and hiring drives based on verified capabilities."
    p_body2.font.size = Pt(11)
    p_body2.font.color.rgb = COLOR_BODY_TEXT

    # Right Container: Innovation & Uniqueness
    card_r2 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.3), Inches(5.9), Inches(5.4))
    card_r2.fill.solid()
    card_r2.fill.fore_color.rgb = COLOR_HIGHLIGHT_BLUE
    card_r2.line.color.rgb = COLOR_SIH_BLUE
    card_r2.line.width = Pt(1.5)

    tb_r2 = s2.shapes.add_textbox(Inches(7.0), Inches(1.4), Inches(5.5), Inches(5.1))
    tf_r2 = tb_r2.text_frame
    tf_r2.word_wrap = True

    p = tf_r2.paragraphs[0]
    p.text = "Innovation & Uniqueness"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_after = Pt(8)

    innovations = [
        ("Evidence-Based Skill Profile (Claim ≠ Verified Skill):", 
         "Eliminates unverified resume claims by attaching tangible proof (GitHub commits, code sandbox verification, proctored quizzes)."),
        ("Explainable Matchmaking Engine:", 
         "Breaks down matching into transparent metrics: Matched Skills %, Missing Delta Skills, and Instant Course Recommendations."),
        ("Next-Best-Action Recommendation Engine:", 
         "Autonomous AI-generated remediation pathway tailored to student's goal (e.g. 'Build 1 React state project to hit 90% Zoho cutoff')."),
        ("Dual-Mode AI Career Coach (Gemini + Offline):", 
         "Integrated Google Gemini AI for mock interview rounds & real-time ATS resume bullet enhancement, backed by high-fidelity offline fallbacks.")
    ]
    for title, desc in innovations:
        p_t = tf_r2.add_paragraph()
        p_t.text = f"• {title}"
        p_t.font.size = Pt(11.5)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_DARK_TEXT
        
        p_d = tf_r2.add_paragraph()
        p_d.text = f"  {desc}"
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = COLOR_BODY_TEXT
        p_d.space_after = Pt(6)

    # ==========================================
    # SLIDE 3: TECHNICAL APPROACH (With Stack & GitHub Link)
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    draw_top_left_pill(s3)
    draw_slide_title(s3, "TECHNICAL APPROACH")
    draw_top_right_sih_badge(s3)
    draw_footer_bar(s3, 3)

    # Left Container: Complete Tech Stack (Professional Scale)
    card_l3 = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.3), Inches(6.8), Inches(4.5))
    card_l3.fill.solid()
    card_l3.fill.fore_color.rgb = COLOR_CARD_BG
    card_l3.line.color.rgb = COLOR_CARD_BORDER

    tb_l3 = s3.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(6.4), Inches(4.3))
    tf_l3 = tb_l3.text_frame
    tf_l3.word_wrap = True

    p = tf_l3.paragraphs[0]
    p.text = "TECHNICAL ARCHITECTURE & COMPLETE STACK"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_after = Pt(6)

    stack_items = [
        ("Frontend Presentation", "React 19 + Vite 8 + ES6 JavaScript + Vanilla CSS Design System\n• Modular Components, Glassmorphic Dashboard, Lucide Icons, Recharts Analytics"),
        ("Backend & APIs", "Python + FastAPI • REST Endpoints • High-concurrency Async Workers\n• Client-Side State & Fallback Handlers in Prototype; Full Python API in Production"),
        ("Database & Storage", "PostgreSQL • Relational Schema for Users, Curricula, Taxonomies & Assessment Data\n• LocalStorage Client-Side Vault for Prototype Resumes & API Settings"),
        ("AI & Intelligence Layer", "Google Gemini AI SDK (@google/generative-ai) + Custom Prompt Frameworks\n• Real-Time ATS Resume Scanner, 5-Stage Mock Interview Evaluator, Skill Gap Delta")
    ]
    for comp, details in stack_items:
        p = tf_l3.add_paragraph()
        r = p.add_run()
        r.text = f"• {comp}: "
        r.font.bold = True
        r.font.size = Pt(11)
        r.font.color.rgb = COLOR_DARK_TEXT
        
        p2 = tf_l3.add_paragraph()
        p2.text = f"  {details}"
        p2.font.size = Pt(10)
        p2.font.color.rgb = COLOR_BODY_TEXT
        p2.space_after = Pt(4)

    # Right Stack Flow Visual Box
    card_r3 = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.6), Inches(1.3), Inches(5.1), Inches(4.5))
    card_r3.fill.solid()
    card_r3.fill.fore_color.rgb = COLOR_HIGHLIGHT_BLUE
    card_r3.line.color.rgb = COLOR_SIH_BLUE

    tb_r3 = s3.shapes.add_textbox(Inches(7.8), Inches(1.4), Inches(4.7), Inches(4.3))
    tf_r3 = tb_r3.text_frame
    tf_r3.word_wrap = True

    p = tf_r3.paragraphs[0]
    p.text = "IMPLEMENTATION PIPELINE FLOW"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_after = Pt(8)

    flow_steps = [
        "1. Student Profile & Target Role Ingestion",
        "2. Diagnostic Skill Gap & Curriculum Mapping",
        "3. Remediation Roadmap (Notes & Cheat Sheets)",
        "4. AI-Enhanced ATS Resume Generation",
        "5. 5-Stage AI Mock Technical Interview",
        "6. Verified Matchmaking for Internships / Placements"
    ]
    for fs in flow_steps:
        p = tf_r3.add_paragraph()
        p.text = fs
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = COLOR_DARK_TEXT
        p.space_after = Pt(4)

    # RULE 4: GitHub Link of Coding / Project on Technical Slide
    gh_card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(5.95), Inches(12.1), Inches(0.85))
    gh_card.fill.solid()
    gh_card.fill.fore_color.rgb = COLOR_GREEN_BG
    gh_card.line.color.rgb = COLOR_GREEN
    gh_card.line.width = Pt(1.5)

    tb_gh = s3.shapes.add_textbox(Inches(0.8), Inches(6.05), Inches(11.7), Inches(0.65))
    tf_gh = tb_gh.text_frame
    p_gh = tf_gh.paragraphs[0]
    r_gh1 = p_gh.add_run()
    r_gh1.text = "🔗 OFFICIAL PROJECT GITHUB REPOSITORY:  "
    r_gh1.font.bold = True
    r_gh1.font.size = Pt(12)
    r_gh1.font.color.rgb = COLOR_GREEN

    r_gh2 = p_gh.add_run()
    r_gh2.text = "https://github.com/faizz-hub/campustoindustry"
    r_gh2.font.bold = True
    r_gh2.font.size = Pt(12)
    r_gh2.font.color.rgb = COLOR_LINK_BLUE

    p_gh2 = tf_gh.add_paragraph()
    p_gh2.text = "Contains full React application source code, AI services, modular notes database, and deployment configurations."
    p_gh2.font.size = Pt(9.5)
    p_gh2.font.color.rgb = COLOR_BODY_TEXT

    # ==========================================
    # SLIDE 4: FEASIBILITY AND VIABILITY (With App/Website Links)
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    draw_top_left_pill(s4)
    draw_slide_title(s4, "FEASIBILITY AND VIABILITY")
    draw_top_right_sih_badge(s4)
    draw_footer_bar(s4, 4)

    # 3 Top Columns: Feasibility, Risks, Mitigation
    col_w = Inches(3.85)
    col_h = Inches(3.9)
    top_y = Inches(1.3)

    # Column 1: Feasibility
    c1 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), top_y, col_w, col_h)
    c1.fill.solid()
    c1.fill.fore_color.rgb = COLOR_CARD_BG
    c1.line.color.rgb = COLOR_CARD_BORDER
    tb1 = s4.shapes.add_textbox(Inches(0.75), top_y + Inches(0.1), col_w - Inches(0.3), col_h - Inches(0.2))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "FEASIBILITY"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_after = Pt(6)
    f_pts = [
        "Software-Only Architecture: Zero dependency on custom proprietary hardware; runs on any standard browser/device.",
        "Modular Phased Scalability: Frontend SPA, AI microservices, and database are decoupled for effortless horizontal scaling.",
        "High-Resilience Prototype: Operates dynamically with live Google Gemini API and features built-in deterministic fallbacks."
    ]
    for pt in f_pts:
        p = tf1.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_BODY_TEXT
        p.space_after = Pt(4)

    # Column 2: Potential Challenges / Risks
    c2 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.72), top_y, col_w, col_h)
    c2.fill.solid()
    c2.fill.fore_color.rgb = COLOR_CARD_BG
    c2.line.color.rgb = COLOR_CARD_BORDER
    tb2 = s4.shapes.add_textbox(Inches(4.87), top_y + Inches(0.1), col_w - Inches(0.3), col_h - Inches(0.2))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "POTENTIAL CHALLENGES / RISKS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = RGBColor(220, 38, 38) # Red
    p.space_after = Pt(6)
    r_pts = [
        "Skill Taxonomy Drift: Tech stacks evolve continuously; benchmarks risk becoming obsolete.",
        "AI Output Inconsistency: Generative models may yield variable feedback across candidate answers.",
        "Student Privacy & Data Security: Student academic records require strict protection under data regulations.",
        "Industry Participation Variance: Disparate corporate response rates across off-campus hiring drives."
    ]
    for pt in r_pts:
        p = tf2.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_BODY_TEXT
        p.space_after = Pt(4)

    # Column 3: Risk Mitigation
    c3 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.85), top_y, col_w, col_h)
    c3.fill.solid()
    c3.fill.fore_color.rgb = COLOR_CARD_BG
    c3.line.color.rgb = COLOR_CARD_BORDER
    tb3 = s4.shapes.add_textbox(Inches(9.0), top_y + Inches(0.1), col_w - Inches(0.3), col_h - Inches(0.2))
    tf3 = tb3.text_frame
    tf3.word_wrap = True
    p = tf3.paragraphs[0]
    p.text = "RISK MITIGATION"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_GREEN
    p.space_after = Pt(6)
    m_pts = [
        "Versioned Skill Repositories: Admin-curated, version-controlled skill taxonomy updated quarterly.",
        "Deterministic Grounding: Strict JSON schema enforcement on AI models to prevent hallucinations.",
        "RBAC & Data Tokenization: Encrypted authentication, role-based access control, and minimal data collection.",
        "Standardized Campus Portal: Pre-mapped company cheat sheets (TCS, Zoho, Google) guarantee day-one value."
    ]
    for pt in m_pts:
        p = tf3.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_BODY_TEXT
        p.space_after = Pt(4)

    # RULE 5: App and Website Links Box in Feasibility & Viability Slide
    app_card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(5.35), Inches(12.1), Inches(1.45))
    app_card.fill.solid()
    app_card.fill.fore_color.rgb = COLOR_HIGHLIGHT_BLUE
    app_card.line.color.rgb = COLOR_SIH_BLUE
    app_card.line.width = Pt(1.5)

    tb_app = s4.shapes.add_textbox(Inches(0.8), Inches(5.45), Inches(11.7), Inches(1.25))
    tf_app = tb_app.text_frame
    p_app = tf_app.paragraphs[0]
    r_app = p_app.add_run()
    r_app.text = "🌐 ASSOCIATED LIVE APPLICATION & DEPLOYMENT LINKS"
    r_app.font.bold = True
    r_app.font.size = Pt(12.5)
    r_app.font.color.rgb = COLOR_SIH_BLUE
    p_app.space_after = Pt(3)

    p_app1 = tf_app.add_paragraph()
    r = p_app1.add_run()
    r.text = "• Live Web Application Link: "
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = COLOR_DARK_TEXT
    r2 = p_app1.add_run()
    r2.text = "https://github.com/faizz-hub/campustoindustry#live-demo  (Vercel Production Deployment)"
    r2.font.size = Pt(11)
    r2.font.color.rgb = COLOR_LINK_BLUE

    p_app2 = tf_app.add_paragraph()
    r = p_app2.add_run()
    r.text = "• Working Prototype Local Endpoint: "
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = COLOR_DARK_TEXT
    r2 = p_app2.add_run()
    r2.text = "http://localhost:5173  (Active Vite Development Server)"
    r2.font.size = Pt(11)
    r2.font.color.rgb = COLOR_LINK_BLUE

    # ==========================================
    # SLIDE 5: IMPACT AND BENEFITS (With Video Link)
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    draw_top_left_pill(s5)
    draw_slide_title(s5, "IMPACT AND BENEFITS")
    draw_top_right_sih_badge(s5)
    draw_footer_bar(s5, 5)

    # 3 Stakeholder Cards Top
    col_w5 = Inches(3.85)
    col_h5 = Inches(3.3)
    top_y5 = Inches(1.3)

    # Students
    cs1 = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), top_y5, col_w5, col_h5)
    cs1.fill.solid()
    cs1.fill.fore_color.rgb = COLOR_CARD_BG
    cs1.line.color.rgb = COLOR_CARD_BORDER
    tbs1 = s5.shapes.add_textbox(Inches(0.75), top_y5 + Inches(0.1), col_w5 - Inches(0.3), col_h5 - Inches(0.2))
    tfs1 = tbs1.text_frame
    tfs1.word_wrap = True
    p = tfs1.paragraphs[0]
    p.text = "STUDENTS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_after = Pt(4)
    s_pts = [
        "Clear 4-year progression pathway from semester 1 to placement day.",
        "Measurable skill growth with verified coding and project evidence.",
        "Direct access to ATS resume optimization and company cheat sheets.",
        "AI-guided interview practice tailored to target job roles."
    ]
    for pt in s_pts:
        p = tfs1.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(9.5)
        p.font.color.rgb = COLOR_BODY_TEXT
        p.space_after = Pt(3)

    # Colleges / Faculty
    cs2 = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.72), top_y5, col_w5, col_h5)
    cs2.fill.solid()
    cs2.fill.fore_color.rgb = COLOR_CARD_BG
    cs2.line.color.rgb = COLOR_CARD_BORDER
    tbs2 = s5.shapes.add_textbox(Inches(4.87), top_y5 + Inches(0.1), col_w5 - Inches(0.3), col_h5 - Inches(0.2))
    tfs2 = tbs2.text_frame
    tfs2.word_wrap = True
    p = tfs2.paragraphs[0]
    p.text = "COLLEGES / FACULTY"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_after = Pt(4)
    c_pts = [
        "Department-level skill heatmap & readiness analytics.",
        "Early identification of academically weak students for intervention.",
        "Consolidated tracking of internships, projects, and hackathon feats.",
        "Curriculum feedback loop based on real employer rejection signals."
    ]
    for pt in c_pts:
        p = tfs2.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(9.5)
        p.font.color.rgb = COLOR_BODY_TEXT
        p.space_after = Pt(3)

    # Industry / Recruiters
    cs3 = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.85), top_y5, col_w5, col_h5)
    cs3.fill.solid()
    cs3.fill.fore_color.rgb = COLOR_CARD_BG
    cs3.line.color.rgb = COLOR_CARD_BORDER
    tbs3 = s5.shapes.add_textbox(Inches(9.0), top_y5 + Inches(0.1), col_w5 - Inches(0.3), col_h5 - Inches(0.2))
    tfs3 = tbs3.text_frame
    tfs3.word_wrap = True
    p = tfs3.paragraphs[0]
    p.text = "INDUSTRY / RECRUITERS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_after = Pt(4)
    i_pts = [
        "Pre-verified candidate skill profiles backed by tangible code artifacts.",
        "Targeted internship and live project talent discovery.",
        "3x faster shortlisting velocity with transparent eligibility matching.",
        "Substantially reduced campus recruitment logistics and hiring costs."
    ]
    for pt in i_pts:
        p = tfs3.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(9.5)
        p.font.color.rgb = COLOR_BODY_TEXT
        p.space_after = Pt(3)

    # Key Benefits & Success Metrics Row
    c_bm = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(4.75), Inches(12.1), Inches(0.85))
    c_bm.fill.solid()
    c_bm.fill.fore_color.rgb = COLOR_CARD_BG
    c_bm.line.color.rgb = COLOR_CARD_BORDER
    tb_bm = s5.shapes.add_textbox(Inches(0.8), Inches(4.8), Inches(11.7), Inches(0.75))
    tf_bm = tb_bm.text_frame
    p = tf_bm.paragraphs[0]
    p.text = "KEY BENEFITS: Continuous 4-year ecosystem | Personalized next-best-action engine | Explainable matching | Verified Digital Career Passport"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK_TEXT
    p2 = tf_bm.add_paragraph()
    p2.text = "SUCCESS METRICS: 40% faster skill-gap closure • 60% higher ATS screening pass rate • 3x increase in student-internship match accuracy"
    p2.font.size = Pt(9.5)
    p2.font.color.rgb = COLOR_SIH_BLUE

    # RULE 6: Video Link of Product in Impact and Benefit Slide
    vid_card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(5.75), Inches(12.1), Inches(1.05))
    vid_card.fill.solid()
    vid_card.fill.fore_color.rgb = RGBColor(254, 242, 242) # Light Red / Video badge
    vid_card.line.color.rgb = RGBColor(220, 38, 38)
    vid_card.line.width = Pt(1.5)

    tb_vid = s5.shapes.add_textbox(Inches(0.8), Inches(5.82), Inches(11.7), Inches(0.9))
    tf_vid = tb_vid.text_frame
    p_vid = tf_vid.paragraphs[0]
    r_v = p_vid.add_run()
    r_v.text = "🎥 OFFICIAL WORKING PRODUCT DEMONSTRATION VIDEO LINK: "
    r_v.font.bold = True
    r_v.font.size = Pt(12)
    r_v.font.color.rgb = RGBColor(185, 28, 28)

    p_vid2 = tf_vid.add_paragraph()
    r_v2 = p_vid2.add_run()
    r_v2.text = "• Product Walkthrough Video (GitHub Hosted): "
    r_v2.font.bold = True
    r_v2.font.size = Pt(11)
    r_v2.font.color.rgb = COLOR_DARK_TEXT
    r_v3 = p_vid2.add_run()
    r_v3.text = "https://github.com/faizz-hub/campustoindustry#product-demo-video"
    r_v3.font.bold = True
    r_v3.font.size = Pt(11)
    r_v3.font.color.rgb = COLOR_LINK_BLUE

    # ==========================================
    # SLIDE 6: RESEARCH AND REFERENCES
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    draw_top_left_pill(s6)
    draw_slide_title(s6, "RESEARCH AND REFERENCES")
    draw_top_right_sih_badge(s6)
    draw_footer_bar(s6, 6)

    # 2 Big Columns
    rw = Inches(5.9)
    rh = Inches(5.4)

    # Left: Official Context & Technical References
    c_r1 = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.3), rw, rh)
    c_r1.fill.solid()
    c_r1.fill.fore_color.rgb = COLOR_CARD_BG
    c_r1.line.color.rgb = COLOR_CARD_BORDER
    tb_r1 = s6.shapes.add_textbox(Inches(0.8), Inches(1.4), rw - Inches(0.4), rh - Inches(0.2))
    tf_r1 = tb_r1.text_frame
    tf_r1.word_wrap = True

    p = tf_r1.paragraphs[0]
    p.text = "Official / Problem Context"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_after = Pt(4)

    pts_o = [
        "Smart India Hackathon 2026 Official Idea Submission Guidelines.",
        "SIH Problem Statement SIH26044: Portal for Academia - Industry collaboration for Skill Mapping, Internships and Placement.",
        "National Education Policy (NEP 2020) framework on continuous skill mapping and Academic Bank of Credits (ABC)."
    ]
    for pt in pts_o:
        p = tf_r1.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(10.5)
        p.font.color.rgb = COLOR_BODY_TEXT
        p.space_after = Pt(4)

    p = tf_r1.add_paragraph()
    p.text = "Technical References & Standards"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_before = Pt(8)
    p.space_after = Pt(4)

    pts_t = [
        "React 19 & Vite 8 Documentation — Single-page architecture, optimized bundle chunks, and DOM lifecycle.",
        "FastAPI & Pydantic Documentation — Asynchronous REST APIs, type safety, and OpenAPI documentation schema.",
        "PostgreSQL 16 & SQLAlchemy Documentation — Relational database normalization, indexing, and foreign key relations.",
        "Google Generative AI SDK Reference — Prompt grounding, structured JSON mode, and Gemini 2.5/3.6 Flash capabilities."
    ]
    for pt in pts_t:
        p = tf_r1.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_BODY_TEXT
        p.space_after = Pt(3)

    # Right: Research Areas & Prototype Note
    c_r2 = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.3), rw, rh)
    c_r2.fill.solid()
    c_r2.fill.fore_color.rgb = COLOR_CARD_BG
    c_r2.line.color.rgb = COLOR_CARD_BORDER
    tb_r2 = s6.shapes.add_textbox(Inches(7.0), Inches(1.4), rw - Inches(0.4), rh - Inches(0.2))
    tf_r2 = tb_r2.text_frame
    tf_r2.word_wrap = True

    p = tf_r2.paragraphs[0]
    p.text = "Research Areas & Literature"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = COLOR_SIH_BLUE
    p.space_after = Pt(4)

    pts_res = [
        "Competency-Based Education & Skill Gap Analytics: Studies on reducing graduate underemployment via structured learning paths.",
        "Explainable Recommender Systems in Talent Acquisition: Moving beyond black-box matching to transparent, verifiable eligibility signals.",
        "AI-Assisted Formative Interview Assessment: Staged technical questioning models and rubric-based speech/text scoring.",
        "Industry Standard Skill Taxonomies: O*NET OnLine and European ESCO hierarchical skill classification frameworks."
    ]
    for pt in pts_res:
        p = tf_r2.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(10.5)
        p.font.color.rgb = COLOR_BODY_TEXT
        p.space_after = Pt(4)

    p = tf_r2.add_paragraph()
    p.text = "Prototype & Validation Note"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = COLOR_AMBER
    p.space_before = Pt(8)
    p.space_after = Pt(4)

    p_proto = tf_r2.add_paragraph()
    p_proto.text = "• Working prototype is fully functional with live AI services, reactive components, and local storage.\n• Demonstration and seeded job opportunity data are synthetic simulations aligned with current Tier-1/Tier-2 Indian tech hiring patterns.\n• Corporate partnerships, active job postings, and university LMS connections will be verified and integrated during Phase 2 deployment."
    p_proto.font.size = Pt(10)
    p_proto.font.color.rgb = COLOR_BODY_TEXT

    out_file = r"c:\sihproject\faizul\Campus2Industry_SIH2026_Official_Presentation.pptx"
    prs.save(out_file)
    print(f"SUCCESS: Saved official template presentation to {out_file}")

if __name__ == "__main__":
    build_sih_official_deck()
