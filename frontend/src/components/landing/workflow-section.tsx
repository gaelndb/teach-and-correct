import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { workflowSteps } from '@/mocks/landing/workflow'

const workflowCardStyles = [
  {
    card: 'bg-blue-50',
    bubble: 'bg-blue-200',
    icon: 'bg-blue-100 text-primary',
    number: 'text-primary',
  },
  {
    card: 'bg-violet-50',
    bubble: 'bg-violet-200',
    icon: 'bg-violet-100 text-violet',
    number: 'text-violet',
  },
  {
    card: 'bg-green-50',
    bubble: 'bg-green-200',
    icon: 'bg-green-100 text-success',
    number: 'text-success',
  },
]

export function WorkflowSection() {
  return (
    <section id="fonctionnement" className="bg-white py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-accent">
            Comment ça marche
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Trois étapes, c’est tout.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon
            const styles = workflowCardStyles[index]

            return (
              <Card
                key={step.title}
                className={`group relative overflow-hidden ${styles.card} transition duration-300 hover:-translate-y-2 hover:shadow-soft`}
              >
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${styles.bubble} transition-transform duration-300 group-hover:scale-125`} />
                <CardHeader className="relative">
                  <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${styles.icon} ring-1 ring-border`}>
                    <Icon className="h-7 w-7" strokeWidth={2.4} />
                  </div>
                  <span className={`text-sm font-black ${styles.number}`}>0{index + 1}</span>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative text-sm leading-7 text-muted-foreground">
                  {step.description}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
