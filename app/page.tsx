"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import { motion } from "framer-motion"
import { ArrowRight, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const expertiseItems = [
    {
      title: "Entrepreneurship",
      description: "Proven entrepreneurial success with MyTracks, turning innovative ideas into impactful solutions."
    },
    {
      title: "Creative Problem-Solving",
      description: "A creative hacker mindset, adept at finding unconventional solutions to challenging problems."
    },
    {
      title: "Data-Driven Decision Making",
      description: "Transforming raw data into actionable insights, enhancing efficiency across industries."
    },
    {
      title: "Artificial Intelligence",
      description: "Leveraging AI and machine learning to streamline complex decision-making in multiple sectors."
    },
    {
      title: "SEO & Digital Marketing",
      description: "Exceptional skills in SEO, driving traffic, and optimizing visibility for tech startups."
    },
    {
      title: "Team Building & Leadership",
      description: "Skilled at attracting and retaining top talent to build high-performing teams."
    }
  ]

  return (
    <>
      <Head>
        <meta name="description" content="Hugo Real – Tech entrepreneur, AI enthusiast, and creative hacker transforming industries through data and strategic innovation. Co-founder of MyTracks, revolutionizing the used car market." />
      </Head>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-gradient-to-b from-primary/10 to-background"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="container px-4 md:px-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="mx-auto relative w-48 h-48 md:w-64 md:h-64 mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pdp_hugo_linkedin-I7NT9BMyi8CRJGyADLGyXPI6optCUV.jpeg"
                  alt="Hugo Real"
                  fill
                  className="rounded-full object-cover border-4 border-primary/20"
                  priority
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">HUGO REAL</h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                ENTREPRENEUR, INNOVATOR &amp; CREATIVE DATA HACKER
              </p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
                <Button
                  className="mt-6"
                  onClick={() => {
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Discover More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <ArrowRight className="h-6 w-6 transform rotate-90" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold tracking-tighter text-center">About Hugo Real</h2>
              <p className="text-muted-foreground">
                Hugo Real is a French tech entrepreneur, born in Toulouse in 1998—the very year France conquered the soccer world, clearly not a coincidence but a symbol of excellence. He holds a degree in Operational Research and Decision Support, blending rigorous analytical skills with a creative flair for innovation.
              </p>
              <p className="text-muted-foreground">
              His unique approach combines technical excellence with strategic thinking, allowing him to bridge the gap between complex technological concepts and practical business applications.
              Specializing in Entrepreneurship, creative data applications and SEO. Known for assembling top-tier teams, he’s the kind of creative hacker who figures out how to make things happen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MyTracks Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-10 max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Co-founder of MyTracks</h2>
              <p className="text-muted-foreground mb-8">
                Hugo Real co-founded MyTracks, a groundbreaking startup set on revolutionizing the second-hand car market by simplifying and streamlining decisions through cutting-edge data analytics. Under his visionary leadership, MyTracks empowers users and professionals alike, shaping the future of automotive transactions.
              </p>

              <motion.a
                href="https://mytracks.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">Discover MyTracks</span>
                <ArrowRight className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold tracking-tighter">Areas of Expertise</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
                Hugo brings a wealth of knowledge and experience across various technological domains.
              </p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {expertiseItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all"
                >
                  <div className="absolute top-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tighter">The Vision</h2>
              <p className="text-muted-foreground">
                Hugo Real envisions a future where technology serves humanity in more intuitive, ethical, and sustainable ways. His work is guided by the belief that technological advancement should enhance human potential rather than replace it.
              </p>
              <p className="text-muted-foreground">
                Through collaborative innovation and forward-thinking leadership, Hugo is committed to developing solutions that address real-world challenges while creating new opportunities for growth and progress.
              </p>
            </motion.div>
          </div>
        </section>

        {/* LinkedIn Contact Section */}
        <section id="contact" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto space-y-8"
            >
              <h2 className="text-3xl font-bold tracking-tighter">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have a question or interested in collaborating? Connect with Hugo on LinkedIn to discuss new opportunities and ideas.
              </p>

              <motion.a
                href="https://linkedin.com/in/hugo-real-053090225"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div
                  className="flex items-center justify-center gap-4 bg-[#0A66C2] text-white px-8 py-6 rounded-2xl shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Linkedin className="h-8 w-8" />
                  <span className="text-xl font-bold">Connect on LinkedIn</span>

                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-[#0A66C2] -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isHovered ? 0.5 : 0,
                      scale: isHovered ? 1.2 : 0.8,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-6">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Hugo Real. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
