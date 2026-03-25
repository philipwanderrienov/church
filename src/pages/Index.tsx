import { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen, Users, Heart, Music } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/church-hero.jpg";
import { seedIfEmpty } from "@/lib/store";

const weeklyActivities = [
  { icon: BookOpen, day: "Sunday", time: "09:00 AM", title: "Sunday Worship Service", description: "Main worship service with sermon and praise" },
  { icon: Users, day: "Tuesday", time: "06:00 PM", title: "Congregational Bible Study", description: "Sectoral bible study groups gathering" },
  { icon: Heart, day: "Wednesday", time: "05:30 PM", title: "Women's Fellowship", description: "Women's prayer and fellowship meeting" },
  { icon: Music, day: "Thursday", time: "07:00 PM", title: "Choir Rehearsal", description: "Weekly choir practice and worship preparation" },
  { icon: Users, day: "Friday", time: "06:00 PM", title: "Youth Fellowship", description: "Youth gathering with praise, games, and devotion" },
  { icon: BookOpen, day: "Saturday", time: "04:00 PM", title: "Sunday School Preparation", description: "Teachers preparing for Sunday School lessons" },
];

export default function Index() {
  useEffect(() => {
    seedIfEmpty();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Church sanctuary"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="hero-overlay absolute inset-0" />
        <Navbar transparent />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <div className="section-divider mx-auto mb-6" />
          <h1 className="font-display text-5xl md:text-7xl font-bold text-cream mb-6 leading-tight">
            Welcome to <br />
            <span className="text-gold">HKBP Church</span>
          </h1>
          <p className="font-body text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            "For where two or three gather in my name, there am I with them."
            <br />
            <span className="text-gold-light italic">— Matthew 18:20</span>
          </p>
          <a
            href="#activities"
            className="inline-block gold-gradient text-primary font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            View Weekly Schedule
          </a>
        </motion.div>
      </section>

      {/* Weekly Activities */}
      <section id="activities" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-4" />
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Weekly Activities
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Join us throughout the week for worship, fellowship, and spiritual growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {weeklyActivities.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-gold/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <activity.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gold">{activity.day}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {activity.title}
                </h3>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-cream/60 text-sm">
            © 2026 HKBP Church. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
