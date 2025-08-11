import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight">About</h1>
        <p className="mt-2 text-white/70">Favour Adimora — Robotics Control Engineer</p>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <img
                src={"/profile-mono.png"}
                alt="Portrait of Favour Adimora"
                className="h-80 w-full object-cover grayscale"
              />
            </div>
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-4">
                <h3 className="text-sm uppercase tracking-widest text-white/70">Skills</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "MPC",
                    "Geometric Control",
                    "Impedance Control",
                    "Visual Servoing",
                    "SLAM",
                    "C++",
                    "Python",
                    "ROS",
                    "Eigen",
                    "Embedded",
                  ].map((t) => (
                    <Badge key={t} variant="outline" className="border-white/30 text-white/85">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-sm uppercase tracking-widest text-white/70">Who I am</h2>
              <p className="mt-3 text-white/90">
                I’m a robotics control engineer focused on reliable autonomy. I design and deploy controllers that ship
                on real hardware — from model predictive controllers for legged robots to uncertainty-aware visual
                servoing on industrial arms. My work emphasizes stability, performance under disturbances, and clean,
                maintainable implementations.
              </p>
            </section>

            <section>
              <h2 className="text-sm uppercase tracking-widest text-white/70">Approach</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-white/90">
                <li>{"Model first: rigorous dynamics and constraints."}</li>
                <li>{"Tight loops: RT-safe code paths and measurable latency budgets."}</li>
                <li>{"Data-informed: logs, validation suites, and ablation."}</li>
                <li>{"Operator empathy: safe modes, clear states, and fast recovery."}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm uppercase tracking-widest text-white/70">Toolkit</h2>
              <p className="mt-3 text-white/90">
                C++/Eigen, Python, ROS, embedded controllers, kinematics/dynamics libraries, optimization (SQP, QP),
                estimation (Kalman, complementary filters), perception, and simulation-to-real workflows.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
