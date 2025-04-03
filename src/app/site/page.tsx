"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSnapchat,
} from "react-icons/fa6";
import {
  ArrowRight,
  Code,
  Layers,
  Wand2,
  Zap,
  MousePointerClick,
  PanelLeft,
  Smartphone,
  Star,
} from "lucide-react";
import Link from "next/link";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const isFeatureInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll();

  const scaleProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(".hero-title", {
      y: 100,
      opacity: 0.5,
      scale: 0.9,
      duration: 1,
    });

    // Animate features on scroll
    const featureItems = document.querySelectorAll(".feature-item");
    featureItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
          delay: index * 0.1,
        }
      );
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  const socialIcons = [
    {
      Component: FaFacebookF,
      name: "Facebook",
      url: "https://www.facebook.com",
    },
    { Component: FaTwitter, name: "Twitter", url: "https://www.twitter.com" },
    {
      Component: FaInstagram,
      name: "Instagram",
      url: "https://www.instagram.com",
    },
    {
      Component: FaSnapchat,
      name: "Snapchat",
      url: "https://www.snapchat.com",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="h-full w-full pt-12 relative flex items-center justify-center flex-col min-h-screen"
      >
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        <motion.div
          className="relative"
          style={{ scale: scaleProgress, opacity: opacityProgress }}
        >
          <h1 className="hero-title bg-gradient-to-r from-[#ff8c00] to-[#ff0080] text-transparent bg-clip-text text-9xl font-bold text-center drop-shadow-lg md:text-[200px] animate-background-shine">
            Aevum
          </h1>
          <motion.p
            className="text-center text-xl md:text-2xl text-white max-w-3xl mx-auto mt-6 px-4 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Build stunning websites in minutes with our intuitive drag-and-drop
            website builder
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#ff8c00] to-[#ff0080] hover:opacity-90 transition-all duration-300 text-white font-semibold shadow-lg animate-background-shine"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 animate-background-shine"
            >
              View Demo
            </Button>
          </motion.div>
        </motion.div>

        <div className="flex justify-center items-center relative mt-24">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1, type: "spring" }}
            className="relative w-full max-w-6xl"
          ></motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-24 bg-background relative overflow-hidden"
      >
        {/* Gradient Overlay at Top */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background/0 to-background z-10"></div>

        {/* Grid Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isFeatureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build professional websites without writing
              a single line of code
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="h-8 w-8" />,
                title: "Drag & Drop Builder",
                description:
                  "Easily build your site with our intuitive drag and drop interface. No coding required.",
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: "Fully Responsive",
                description:
                  "All websites built with Aevum look great on any device, from mobile to desktop.",
              },
              {
                icon: <Wand2 className="h-8 w-8" />,
                title: "AI-Powered Design",
                description:
                  "Let our AI suggest design improvements and create content for your website.",
              },
              {
                icon: <PanelLeft className="h-8 w-8" />,
                title: "100+ Templates",
                description:
                  "Start with professionally designed templates for any industry or purpose.",
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Custom Code",
                description:
                  "Advanced users can add custom code to extend functionality when needed.",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Lightning Fast",
                description:
                  "Optimized for speed with global CDN and advanced caching techniques.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#ee0979]/20 to-[#ff6a00]/20 flex items-center justify-center mb-4">
                  <div className="text-gradient-to-r from-[#ee0979] to-[#ff6a00]">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create your website in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] hidden md:block"></div>

            {[
              {
                step: "01",
                icon: <MousePointerClick className="h-8 w-8" />,
                title: "Choose a Template",
                description:
                  "Browse our collection of professional templates designed for various industries.",
              },
              {
                step: "02",
                icon: <Wand2 className="h-8 w-8" />,
                title: "Customize Design",
                description:
                  "Personalize your template with your brand colors, images, and content.",
              },
              {
                step: "03",
                icon: <Zap className="h-8 w-8" />,
                title: "Publish Your Site",
                description:
                  "Launch your website with one click and share it with the world.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-background border border-border rounded-xl p-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#ee0979] to-[#ff6a00] flex items-center justify-center mb-6 mx-auto">
                  <span className="text-white font-bold text-xl">
                    {step.step}
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>

        {/* Testimonials Content */}
        <div className="relative container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-gray-300">
              Join thousands of satisfied customers building with Aevum
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                image:
                  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHN8ZW58MHx8MHx8fDA%3D",
                content:
                  "Aevum helped me create a professional website for my business in just a few hours. The templates are beautiful and the editor is so easy to use!",
                stars: 5,
              },
              {
                name: "Michael Chen",
                role: "Freelance Designer",
                image:
                  "https://images.unsplash.com/photo-1562788869-4ed32648eb72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
                content:
                  "As a designer, I appreciate the flexibility Aevum offers. I can create custom designs for my clients quickly without compromising on quality.",
                stars: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Director",
                image:
                  "https://images.unsplash.com/photo-1600107215508-1886e6e49c11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8MTIxMDY3OTZ8fGVufDB8fHx8fA%3D%3D",
                content:
                  "We switched to Aevum for our company website and couldn't be happier. The SEO tools and analytics have helped us increase our traffic by 40%.",
                stars: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array(testimonial.stars)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-gradient-to-br from-[#ee0979]/20 to-[#ff6a00]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$9",
                description: "Perfect for beginners and small projects",
                features: [
                  "1 Website",
                  "100 Pages",
                  "Free Domain for 1 Year",
                  "Basic Templates",
                  "Standard Support",
                  "Basic Analytics",
                ],
                popular: false,
                buttonText: "Get Started",
              },
              {
                name: "Professional",
                price: "$29",
                description: "Ideal for growing businesses",
                features: [
                  "5 Websites",
                  "Unlimited Pages",
                  "Free Domain for 1 Year",
                  "Premium Templates",
                  "Priority Support",
                  "Advanced Analytics",
                  "E-commerce Features",
                ],
                popular: true,
                buttonText: "Get Started",
              },
              {
                name: "Enterprise",
                price: "$99",
                description: "For large organizations with complex needs",
                features: [
                  "Unlimited Websites",
                  "Unlimited Pages",
                  "Free Domain for Life",
                  "Custom Templates",
                  "24/7 Dedicated Support",
                  "Advanced Analytics",
                  "E-commerce Features",
                  "API Access",
                  "White Labeling",
                ],
                popular: false,
                buttonText: "Contact Sales",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`bg-card border ${
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border"
                } rounded-xl p-8 relative`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white text-sm font-medium py-1 px-4 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-[#ee0979] to-[#ff6a00] flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#ee0979] to-[#ff6a00] hover:opacity-90"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-white">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        {/* CTA Content */}
        <div className="relative container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-gradient-to-r from-[#ee0979]/10 to-[#ff6a00]/10 rounded-2xl p-8 md:p-12 border border-border relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            {/* Blurred Gradient Effect */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-gradient-to-br from-[#ee0979]/30 to-[#ff6a00]/30 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Your Dream Website?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of users who are already creating stunning
                websites with Aevum
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#ee0979] to-[#ff6a00] hover:opacity-90 transition-all duration-300"
                >
                  Start Building for Free{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 pt-16 pb-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#ee0979] to-[#ff6a00] flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="font-bold text-xl">Aevum</span>
              </Link>
              <p className="text-muted-foreground mb-4 max-w-md">
                Aevum is the all-in-one website builder that makes it easy to
                create beautiful, professional websites without any coding
                knowledge.
              </p>
              <div className="flex gap-4">
                {socialIcons.map(({ Component, name, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary transition-colors"
                    aria-label={name}
                  >
                    <Component className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {[
                  "Features",
                  "Templates",
                  "Pricing",
                  "Integrations",
                  "Updates",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {[
                  "Documentation",
                  "Tutorials",
                  "Blog",
                  "Community",
                  "Help Center",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {[
                  "About",
                  "Careers",
                  "Contact",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Aevum. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
