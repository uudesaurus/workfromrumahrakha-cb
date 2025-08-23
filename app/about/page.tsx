"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-light text-white mb-8 tracking-tight">
            About the <span className="font-medium">House</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
            Rumah Rakha isn't just a place—it's where builders come to build. 
            We're a bunch of friends who happen to be obsessed with creating stuff that matters.
          </p>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              Who's always there in the <span className="font-medium">house</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The usual suspects who make this place feel like home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

            {/* Narin */}
            <div className="group">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/20">
                  <span className="text-3xl font-light text-white">N</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Narin</h3>
                <p className="text-sm text-red-400/80 mb-4 font-medium tracking-wide">Finance Bro</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  Talks about markets, investments, and "the next big thing." Probably owns crypto, 
                  definitely thinks he's Warren Buffett. But hey, someone's got to keep us financially literate.
                </p>
              </div>
            </div>

             {/* Umar */}
             <div className="group">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/20">
                  <span className="text-3xl font-light text-white">U</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Umar</h3>
                <p className="text-sm text-green-400/80 mb-4 font-medium tracking-wide">Full-Stack Wizard</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  Can build anything from scratch. Frontend, backend, databases—you name it. 
                  Also the guy who fixes things when they break at 3 AM.
                </p>
              </div>
            </div>

            {/* Rakha */}
            <div className="group">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/20">
                  <span className="text-3xl font-light text-white">R</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Rakha</h3>
                <p className="text-sm text-blue-400/80 mb-4 font-medium tracking-wide">House Owner</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  The guy who owns the place. Also happens to be pretty good at building things that scale. 
                  When he's not coding, he's probably thinking about the next big thing.
                </p>
              </div>
            </div>

            {/* Uud */}
            <div className="group">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/20">
                  <span className="text-3xl font-light text-white">U</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Uud</h3>
                <p className="text-sm text-yellow-400/80 mb-4 font-medium tracking-wide">The Maybe Guy</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  "Maybe we should try this?" "Maybe that will work?" Always has ideas, 
                  sometimes they're good, sometimes they're... interesting. But hey, at least he's thinking.
                </p>
              </div>
            </div>


            {/* Lio */}
            <div className="group">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/20">
                  <span className="text-3xl font-light text-white">L</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Lio</h3>
                <p className="text-sm text-purple-400/80 mb-4 font-medium tracking-wide">Jogja Local</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  Lives in Jogja and thinks that makes him automatically cultured. Always talking about 
                  "the creative energy here" while we're stuck in traffic. Claims he's "networking" 
                  but really just eating gudeg and posting Instagram stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
            Why we <span className="font-medium">build</span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Look, we're not trying to save the world or anything dramatic. We just like building things that work, 
            that people actually use, and that make life a little bit better. Simple as that.
          </p>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12 max-w-3xl mx-auto">
            <p className="text-lg text-white/80 leading-relaxed italic font-light">
              "We build because we can't not build. It's not about money or fame—it's about solving problems 
              and making something that didn't exist before. Plus, it's fun as hell."
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
            What we <span className="font-medium">actually</span> do
          </h2>
          <p className="text-xl text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
            We build stuff. Sometimes it's apps, sometimes it's websites, sometimes it's just experiments 
            that go nowhere. But we're always building, always learning, always pushing forward.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/20">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Build</h3>
              <p className="text-white/70 leading-relaxed">
                We build things that solve real problems. No fluff, just working code.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/20">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Learn</h3>
              <p className="text-white/70 leading-relaxed">
                Every project teaches us something new. We're always students.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/20">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Share</h3>
              <p className="text-white/70 leading-relaxed">
                What we learn, we share. Knowledge is worthless if you keep it to yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
