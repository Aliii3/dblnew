#!/usr/bin/env python3
"""Generate premium HTML pages with shared chrome."""
import os
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEGACY_PAGES = os.path.join(ROOT, "legacy", "framer-pages")
LOGO = "https://framerusercontent.com/images/BBeCdJdGDocOQg4RKp3Bx3sU.png"

NAV_ITEMS = [
    ("services", "Our Services", "index.html#service"),
    ("impact", "Deep Impact", "index.html#deep-impact"),
    ("about", "About Us", "aboutuss.html"),
    ("blogs", "Blogs", "blogs.html"),
    ("careers", "Careers", "careers.html"),
]


def chrome(base: str, title: str, description: str, active: str, extra_css: bool = True) -> tuple[str, str]:
    """Return (head+chrome_start, chrome_end+scripts)."""
    assets = f"{base}assets"
    home = f"{base}index.html"

    nav_links = ""
    for key, label, href in NAV_ITEMS:
        cls = ' class="is-active"' if active == key else ""
        nav_links += f'<li><a href="{base}{href}"{cls}>{label}</a></li>\n        '

    mobile_nav = f"""
    <a href="{base}index.html#service">Services</a>
    <a href="{base}index.html#deep-impact">Deep Impact</a>
    <a href="{base}aboutuss.html">About</a>
    <a href="{base}blogs.html">Blogs</a>
    <a href="{base}careers.html">Careers</a>
    <a class="text-gold" href="{base}let-s-talk.html">Let's Talk</a>"""

    pages_link = f'<link rel="stylesheet" href="{assets}/css/pages.css"/>' if extra_css else ""

    start = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>{title}</title>
  <meta name="description" content="{description}"/>
  <link rel="icon" href="{LOGO}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,400;0,500;0,600;0,700;1,600&family=Inter+Tight:wght@600;700;800;900&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="{assets}/css/styles.css"/>
  {pages_link}
</head>
<body>
  <div class="preloader" id="preloader"><div style="text-align:center">
    <img class="preloader__logo" src="{LOGO}" alt="" width="64" height="64"/>
    <div class="preloader__bar"><div class="preloader__fill"></div></div>
  </div></div>
  <div class="cursor" aria-hidden="true"></div>
  <div class="cursor-ring" aria-hidden="true"></div>
  <div class="scroll-progress" aria-hidden="true"></div>
  <div class="bg-mesh" aria-hidden="true"></div>
  <div class="bg-orbs" aria-hidden="true"><div class="orb orb--1"></div><div class="orb orb--2"></div><div class="orb orb--3"></div></div>
  <div class="grain" aria-hidden="true"></div>
  <header class="nav is-scrolled" id="nav">
    <div class="container nav__inner">
      <a class="nav__logo" href="{home}"><img src="{LOGO}" alt="DBLSHOT" width="40" height="40"/><span>DBLSHOT</span></a>
      <ul class="nav__links">{nav_links}</ul>
      <a class="btn btn--primary btn--magnetic hidden-mobile" href="{base}let-s-talk.html">Let's Talk</a>
      <button class="nav__toggle" id="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </header>
  <nav class="mobile-menu" id="mobile-menu">{mobile_nav}
  </nav>
  <main class="page-main">"""

    end = f"""
  </main>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <a class="nav__logo" href="{home}"><img src="{LOGO}" alt="" width="44" height="44"/><span>DBLSHOT</span></a>
          <p>Strategic performance marketing and e-commerce partner for FMCG brands across Egypt and the GCC.</p>
          <div class="footer__social">
            <a href="https://www.linkedin.com/company/dblshot/" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            <a href="https://www.instagram.com/dblshot1/" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
            <a href="https://www.tiktok.com/@dblshot.agency" target="_blank" rel="noopener" aria-label="TikTok">tk</a>
          </div>
        </div>
        <div><h5>Navigation</h5><ul>
          <li><a href="{base}index.html#service">Our Services</a></li>
          <li><a href="{base}aboutuss.html">About Us</a></li>
          <li><a href="{base}blogs.html">Blogs</a></li>
          <li><a href="{base}careers.html">Careers</a></li>
          <li><a href="{base}jrm3.html">Junior Marketer</a></li>
        </ul></div>
        <div><h5>Connect</h5><ul>
          <li><a href="mailto:clients@dblshot.co">clients@dblshot.co</a></li>
          <li><a href="{base}let-s-talk.html">Let's Talk</a></li>
          <li><a href="{base}privacy-policy.html">Privacy Policy</a></li>
        </ul></div>
      </div>
      <div class="footer__bottom"><p>© 2026 DBLSHOT. All rights reserved.</p></div>
    </div>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>
  <script src="{assets}/js/core.js"></script>
</body>
</html>"""
    return start, end


def page_hero(label: str, title_html: str, sub: str = "") -> str:
    sub_html = f'<p class="page-hero__sub reveal">{sub}</p>' if sub else ""
    return f"""
    <section class="page-hero">
      <div class="container">
        <span class="section-label reveal">{label}</span>
        <h1 class="page-hero__title"><span class="reveal-line"><span>{title_html}</span></span></h1>
        {sub_html}
      </div>
    </section>"""


def write_page(rel_path: str, title: str, desc: str, active: str, body: str):
    base = "../" * rel_path.count("/")
    start, end = chrome(base, title, desc, active)
    path = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(start + body + end)
    print("Wrote", rel_path)


def backup_framer():
    os.makedirs(LEGACY_PAGES, exist_ok=True)
    for name in [
        "aboutuss.html", "blogs.html", "careers.html", "let-s-talk.html", "jrm3.html",
        "privacy-policy.html", "blogs/ecommerce.html", "blogs/ramadan-preparation-blog.html",
        "blogs/egypts-dessert-market-2.html", "our-services/amazon/about.html",
        "our-services/amazon/isiscasestudy.html",
    ]:
        src = os.path.join(ROOT, name)
        if os.path.isfile(src):
            dst = os.path.join(LEGACY_PAGES, name.replace("/", "__"))
            shutil.copy2(src, dst)


def main():
    backup_framer()

    write_page("aboutuss.html", "About Us — Double Shot", "Meet Radwa Fathi and the DBLSHOT team.", "about",
        page_hero("Our Story", 'Watch Our <span class="text-gold">Story</span>',
            "Meet Radwa Fathi, the bold architect of Egyptian brands.") + """
    <section class="section"><div class="container split reveal-stagger">
      <div class="split__media reveal"><div class="video-frame"><span class="video-frame__play" aria-hidden="true">▶</span></div></div>
      <div>
        <p class="reveal" style="color:var(--muted);line-height:1.75;margin-bottom:1.25rem">Dblshot is a strategic performance marketing and e-commerce partner dedicated to helping FMCG brands achieve sustainable growth across Egypt and the GCC.</p>
        <p class="reveal" style="color:var(--muted);line-height:1.75;margin-bottom:1.25rem">Specializing in e-commerce full management, Amazon Ads, performance marketing, website development, and CRO, we combine data-driven insights with creative solutions to craft strategies that drive measurable business outcomes.</p>
        <p class="reveal" style="color:var(--muted);line-height:1.75;margin-bottom:2rem">With over 20 years of experience, Radwa Fathi blends analytical precision with visionary thinking to guide brands through complex challenges — empowering them to scale with clarity and purpose.</p>
        <a class="btn btn--primary btn--magnetic reveal" href="let-s-talk.html">Let's Talk</a>
      </div>
    </div></section>
    <section class="section"><div class="container">
      <div class="cta-strip reveal"><div><h3>Junior Marketer Initiative</h3><p style="color:var(--muted);margin:0.5rem 0 0">Nurturing the next generation of marketers.</p></div>
      <a class="btn btn--ghost btn--magnetic" href="jrm3.html">Learn More</a></div>
    </div></section>""")

    blog_cards = """
    <section class="section"><div class="container blogs-grid reveal-stagger">
      <a class="blog-card" href="blogs/ecommerce.html"><div class="blog-card__img"><img src="https://framerusercontent.com/images/KORKIIaVyNYhNqF8u5HI7TOtgI.png" alt="" loading="lazy"/></div><div class="blog-card__body"><div class="blog-card__tag">Ecommerce</div><h3>From Stage to Backstage: How the Gulf Outpaces Egypt</h3><span class="blog-card__cta">Read more →</span></div></a>
      <a class="blog-card" href="blogs/ramadan-preparation-blog.html"><div class="blog-card__img"><img src="https://framerusercontent.com/images/L7GjRwDuWRVchLLbK5Ywjet6gHo.png" alt="" loading="lazy"/></div><div class="blog-card__body"><div class="blog-card__tag">FMCG</div><h3>Capitalize on Ramadan Seasons on E-commerce Platforms</h3><span class="blog-card__cta">Read more →</span></div></a>
      <a class="blog-card" href="blogs/egypts-dessert-market-2.html"><div class="blog-card__img"><img src="https://framerusercontent.com/images/E46KWmdgoYtOJu56riHrVue3xo.png" alt="" loading="lazy"/></div><div class="blog-card__body"><div class="blog-card__tag">Market Insights</div><h3>Egypt's Dessert Market: Konafa to All Things Pistachio</h3><span class="blog-card__cta">Read more →</span></div></a>
      <a class="blog-card" href="our-services/amazon/isiscasestudy.html"><div class="blog-card__img"><img src="https://framerusercontent.com/images/8wprddWF4WCBYnjWHwQnihdYXPo.png" alt="" loading="lazy"/></div><div class="blog-card__body"><div class="blog-card__tag">Case Study</div><h3>iSiS Organic: 245% Growth, 2,470% YOY Amazon Sales</h3><span class="blog-card__cta">Read more →</span></div></a>
    </div></section>"""

    write_page("blogs.html", "Blogs — Double Shot", "Knowledge Drop — insights on e-commerce and FMCG.", "blogs",
        page_hero("Knowledge Drop", 'Latest <span class="text-gold">Insights</span>',
            "Bold ideas, market shifts, and growth stories from our team.") + blog_cards)

    write_page("careers.html", "Careers — Double Shot", "Join the DBLSHOT team in New Cairo.", "careers",
        page_hero("Careers", 'Join the <span class="text-gold">Impact</span>',
            "We're building a team of strategists, creators, and operators.") + """
    <section class="section"><div class="container jobs-list reveal-stagger">
      <article class="job-card reveal"><div><h3>Senior Graphic Designer</h3><p>Highly creative strategic designer with 5+ years shaping brand identities and high-impact visual assets for performance marketing.</p><div class="job-tag">New Cairo</div><div class="job-tag">5+ years</div></div><a class="btn btn--primary btn--magnetic" href="mailto:clients@dblshot.co?subject=Senior%20Graphic%20Designer">Apply Now</a></article>
      <article class="job-card reveal"><div><h3>Social Media Moderator</h3><p>Engage communities, manage brand voice, and support social performance across platforms.</p><div class="job-tag">New Cairo</div></div><a class="btn btn--primary btn--magnetic" href="mailto:clients@dblshot.co?subject=Social%20Media%20Moderator">Apply Now</a></article>
      <article class="job-card reveal"><div><h3>Reel Creator</h3><p>2–3 years in short-form video. Produce high-performing Reels aligned with brand identity and social trends.</p><div class="job-tag">New Cairo</div><div class="job-tag">2-3 years</div></div><a class="btn btn--primary btn--magnetic" href="mailto:clients@dblshot.co?subject=Reel%20Creator">Apply Now</a></article>
      <article class="job-card reveal"><div><h3>Performance Marketing Specialist</h3><p>Drive measurable campaign outcomes across paid channels with analytical rigor.</p><div class="job-tag">On-site — New Cairo</div></div><a class="btn btn--primary btn--magnetic" href="mailto:clients@dblshot.co?subject=Performance%20Marketing">Apply Now</a></article>
    </div></section>""")

    write_page("let-s-talk.html", "Let's Talk — Double Shot", "Book a meeting with DBLSHOT.", "",
        page_hero("Contact", '<span class="text-gold">Let\'s Talk</span>', "Get the offer. Kick off. Boost.") + """
    <section class="section"><div class="container contact-grid">
      <div class="contact-intro reveal">
        <div class="cta-words"><span class="cta-word">talk.</span><span class="cta-word">kick off.</span><span class="cta-word">boost.</span></div>
        <h2>Start your growth journey</h2>
        <p style="color:var(--muted);line-height:1.7">Tell us about your brand. We'll respond within one business day.</p>
        <p style="margin-top:2rem"><a href="mailto:clients@dblshot.co" class="text-gold">clients@dblshot.co</a><br/><span style="color:var(--muted)">+20 128 977 2228</span></p>
      </div>
      <div class="form-card reveal">
        <div class="form-card__step">Fill the form — Step 1/2</div>
        <form class="form-grid" action="mailto:clients@dblshot.co" method="post" enctype="text/plain">
          <div class="form-grid form-grid--2">
            <div class="form-field"><label>Full Name</label><input type="text" name="name" required/></div>
            <div class="form-field"><label>Email</label><input type="email" name="email" required/></div>
          </div>
          <div class="form-grid form-grid--2">
            <div class="form-field"><label>Country</label><input type="text" name="country"/></div>
            <div class="form-field"><label>Phone Number</label><input type="tel" name="phone"/></div>
          </div>
          <div class="form-grid form-grid--2">
            <div class="form-field"><label>Job Title</label><input type="text" name="title"/></div>
            <div class="form-field"><label>Industry</label><input type="text" name="industry"/></div>
          </div>
          <div class="form-field"><label>How did you hear about us?</label>
            <div class="form-checkgroup">
              <label><input type="checkbox" name="source" value="social"/> Social Media</label>
              <label><input type="checkbox" name="source" value="search"/> Search Engine</label>
              <label><input type="checkbox" name="source" value="word"/> Word of Mouth</label>
              <label><input type="checkbox" name="source" value="ads"/> Advertisement</label>
              <label><input type="checkbox" name="source" value="linkedin"/> LinkedIn</label>
            </div>
          </div>
          <div class="form-field"><label>Service Needed</label>
            <div class="form-checkgroup">
              <label><input type="checkbox" name="service" value="ecommerce"/> Ecommerce</label>
              <label><input type="checkbox" name="service" value="amazon"/> Amazon Ads</label>
              <label><input type="checkbox" name="service" value="research"/> Market Research</label>
              <label><input type="checkbox" name="service" value="cro"/> CRO</label>
            </div>
          </div>
          <div class="form-field"><label>Message</label><textarea name="message" placeholder="Tell us about your goals…"></textarea></div>
          <button type="submit" class="btn btn--primary btn--magnetic" style="width:100%">Book a Meeting</button>
        </form>
      </div>
    </div></section>""")

    write_page("jrm3.html", "Junior Marketer — Double Shot", "Round 3 — launch your marketing journey.", "",
        page_hero("Junior Marketer", 'Round 3 is <span class="text-gold">Soon</span>',
            "It's not just a course. It's your launchpad.") + """
    <section class="section"><div class="container">
      <p class="reveal" style="color:var(--muted);font-size:1.15rem;line-height:1.7;max-width:640px;margin-bottom:3rem">Built for ambitious juniors ready to think bigger and grow faster. We don't stop at theory — our juniors get hands-on experience.</p>
      <div class="feature-grid feature-grid--3 reveal-stagger">
        <div class="feature-card reveal"><div class="feature-card__icon">📊</div><h3>Market Research</h3><p>Learn how to conduct real market research for brands.</p></div>
        <div class="feature-card reveal"><div class="feature-card__icon">📱</div><h3>Social Launch</h3><p>Launch and grow social media platforms from zero.</p></div>
        <div class="feature-card reveal"><div class="feature-card__icon">🎬</div><h3>Reels & Content</h3><p>Create reels and engaging content that performs.</p></div>
        <div class="feature-card reveal"><div class="feature-card__icon">📈</div><h3>Media Ads</h3><p>Explore selling ideas through paid media campaigns.</p></div>
      </div>
      <div class="cta-strip reveal" style="margin-top:3rem"><h3>Ready to begin?</h3><a class="btn btn--primary btn--magnetic" href="let-s-talk.html">Apply for Round 3</a></div>
    </div></section>""")

    privacy_body = """
    <section class="prose-section"><div class="container prose-layout">
      <article class="prose reveal-stagger">
        <p class="lead reveal">Double Shot is a performance marketing and consulting agency providing digital marketing, media buying, e-commerce support, and related business solutions.</p>
        <h2 class="reveal">1. Introduction</h2>
        <p class="reveal">If you have questions about this Privacy Policy, contact us at <a href="mailto:clients@dblshot.co">clients@dblshot.co</a>, +20 128 977 2228, or New Cairo, 5th settlement, Northern 90th Street, Al Tabib 2.</p>
        <h2 class="reveal">2. Information We Collect</h2>
        <p class="reveal">We may collect: name, email, phone, company name, business details, browser type, device information, pages visited, referral source, and cookies. We may also receive data from analytics and advertising platforms.</p>
        <h2 class="reveal">3. How We Use Your Information</h2>
        <ul class="reveal"><li>Respond to inquiries and provide services</li><li>Improve our website and campaigns</li><li>Send service-related communications</li><li>Comply with legal obligations</li></ul>
        <h2 class="reveal">4. Cookies</h2>
        <p class="reveal">We use cookies and pixels to measure traffic, track conversions, and deliver relevant ads. You may disable cookies in your browser settings.</p>
        <h2 class="reveal">5. Data Sharing</h2>
        <p class="reveal">We do not sell your personal information. We may share data with hosting, analytics, CRM, advertising, and scheduling providers as needed.</p>
        <h2 class="reveal">6. Your Rights</h2>
        <p class="reveal">You may request access, correction, deletion, or restriction of your data by contacting <a href="mailto:clients@dblshot.co">clients@dblshot.co</a>.</p>
      </article>
      <aside class="prose-aside reveal"><h4>Contact</h4><p style="color:var(--muted);font-size:0.9rem;line-height:1.6">clients@dblshot.co<br/>+20 128 977 2228<br/>New Cairo, Egypt</p></aside>
    </div></section>"""

    write_page("privacy-policy.html", "Privacy Policy — Double Shot", "How DBLSHOT handles your data.", "",
        page_hero("Legal", '<span class="text-gold">Privacy</span> Policy') + privacy_body)

    def article_wrap(content, b):
        return f"""
    <section class="prose-section"><div class="container prose-layout">
      <article class="prose reveal-stagger">{content}</article>
      <aside class="prose-aside reveal"><h4>Work with us</h4><p style="color:var(--muted);font-size:0.9rem;margin-bottom:1rem">Ready to scale your brand?</p><a class="btn btn--primary btn--magnetic" href="{b}let-s-talk.html" style="width:100%">Let's Talk</a></aside>
    </div></section>"""

    write_page("blogs/ecommerce.html", "Gulf vs Egypt E-commerce — Double Shot", "Amazon delivery playbooks across MENA.", "blogs",
        page_hero("Ecommerce", 'Stage to <span class="text-gold">Backstage</span>',
            "How the Gulf outpaces Egypt in the e-commerce play.") + article_wrap("""
        <p class="lead reveal">Amazon delivery looks the same on every screen, but operations tell a different story — fulfillment speed and inventory placement vary by market.</p>
        <h2 class="reveal">In Egypt</h2>
        <p class="reveal">Amazon Prime is largely scheduled delivery, with same-day or next-day on selected SKUs and ultra-fast grocery tiers emerging in key zones.</p>
        <h2 class="reveal">In the Gulf</h2>
        <p class="reveal">Amazon Now (UAE) enables ultra-fast delivery — including 2-hour delivery on thousands of essentials — while infrastructure density supports darker, faster fulfillment models.</p>
        <h2 class="reveal">Talabat Mart</h2>
        <p class="reveal">Dark-store density and rider speed create very different experiences behind the scenes. Brands that win adapt playbook per market — not one-size-fits-all.</p>""", "../"))

    write_page("blogs/ramadan-preparation-blog.html", "Ramadan FMCG Guide — Double Shot", "Capitalize on Ramadan e-commerce seasons.", "blogs",
        page_hero("FMCG Guide", 'Ramadan <span class="text-gold">Preparation</span>',
            "How to capitalize on Ramadan seasons on e-commerce platforms.") + article_wrap("""
        <h2 class="reveal">Introduction</h2><p class="reveal">Ramadan shifts demand patterns, basket size, and promotional windows — FMCG brands need a dedicated playbook.</p>
        <h2 class="reveal">Strategic Planning</h2><p class="reveal">Align inventory, pricing, and creative calendars 6–8 weeks before peak demand.</p>
        <h2 class="reveal">Promotions</h2><p class="reveal">Bundle offers, tiered discounts, and platform-specific deals drive visibility during high-competition windows.</p>
        <h2 class="reveal">Operational Excellence</h2><p class="reveal">Stock availability and fulfillment SLAs make or break conversion during peak weeks.</p>
        <h2 class="reveal">Measuring Success</h2>        <p class="reveal">Track CIR, ROAS, share of voice, and repeat purchase rate — optimize weekly, not monthly.</p>""", "../"))

    write_page("blogs/egypts-dessert-market-2.html", "Egypt Dessert Market — Double Shot", "Konafa to pistachio — dessert market shift.", "blogs",
        page_hero("Market Insights", 'The <span class="text-gold">Sweet Shift</span>',
            "Why dessert brands can no longer ignore innovation.") + article_wrap("""
        <p class="lead reveal">For years, Egypt's dessert market thrived on tradition — Kunafa, Basbousa, and Om Ali with little pressure to innovate.</p>
        <h2 class="reveal">The First Glance</h2>
        <p class="reveal">Consumer appetite has shifted toward premium pistachio, fusion formats, and D2C discovery — brands that cling to legacy alone risk Nokia-era stagnation.</p>
        <h2 class="reveal">Recipe for Survival</h2>
        <p class="reveal">Innovate format and story, own Amazon &amp; quick-commerce shelves, and build always-on performance creative — not seasonal bursts alone.</p>
        <h2 class="reveal">Final Thought</h2>
        <p class="reveal">2025 and beyond belong to brands that treat dessert as a growth category, not a commodity.</p>""", "../"))

    write_page("our-services/amazon/about.html", "Amazon Ads — Double Shot", "Amazon advertising and growth services.", "services",
        page_hero("Amazon Ads", 'About <span class="text-gold">Amazon Ads</span>',
            "Proven strategies to boost visibility, sales, and ROI.") + """
    <section class="section"><div class="container split reveal-stagger">
      <div><ul class="checklist reveal">
        <li>Proven strategies to boost visibility &amp; sales</li>
        <li>Amazon experts across Sponsored Products, Brands &amp; Display</li>
        <li>Clear dashboards, real ROI, and consistent scaling</li>
        <li>Customized campaigns built for your brand's growth</li>
      </ul>
      <a class="btn btn--primary btn--magnetic reveal" href="../../let-s-talk.html" style="margin-top:2rem">Partner With Us</a></div>
      <div class="split__media reveal"><img src="https://framerusercontent.com/images/8wprddWF4WCBYnjWHwQnihdYXPo.png" alt="Amazon growth" loading="lazy"/></div>
    </div></section>
    <section class="section"><div class="container">
      <div class="cta-strip reveal"><h3>iSiS Organic Case Study</h3><a class="btn btn--ghost btn--magnetic" href="isiscasestudy.html">View Results →</a></div>
    </div></section>""")

    write_page("our-services/amazon/isiscasestudy.html", "iSiS Organic Case Study — Double Shot", "245% e-commerce growth, 2470% YOY Amazon sales.", "services",
        page_hero("Case Study", 'iSiS <span class="text-gold">Organic</span>',
            "245% growth in e-commerce · 2,470% YOY growth in Amazon sales.") + """
    <section class="section"><div class="container">
      <div class="metrics-row reveal-stagger">
        <div class="metric-pill reveal"><strong data-count="245" data-suffix="%">0</strong><span>E-commerce growth</span></div>
        <div class="metric-pill reveal"><strong data-count="2470" data-suffix="%">0</strong><span>YOY Amazon</span></div>
        <div class="metric-pill reveal"><strong>Amazon</strong><span>Ads mastery</span></div>
        <div class="metric-pill reveal"><strong>FMCG</strong><span>Category</span></div>
      </div>
      <div class="split reveal-stagger" style="margin-top:3rem">
        <div class="split__media reveal"><img src="https://framerusercontent.com/images/8wprddWF4WCBYnjWHwQnihdYXPo.png" alt="iSiS Organic" loading="lazy"/></div>
        <div>
          <p class="reveal" style="color:var(--muted);line-height:1.75">We rebuilt iSiS Organic's Amazon presence with listing optimization, structured PPC, and inventory-aligned campaigns — turning marketplace complexity into compounding growth.</p>
          <p class="reveal" style="color:var(--muted);line-height:1.75;margin-top:1rem">The result: explosive e-commerce revenue and Amazon becoming a primary growth engine for the brand.</p>
          <a class="btn btn--primary btn--magnetic reveal" href="../../let-s-talk.html" style="margin-top:2rem">Start Your Project</a>
        </div>
      </div>
    </div></section>""")

    # Home.html redirect
    with open(os.path.join(ROOT, "Home.html"), "w") as f:
        f.write('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=index.html"/><title>Redirect</title></head><body><a href="index.html">Continue</a></body></html>')

    print("Done.")


if __name__ == "__main__":
    main()
