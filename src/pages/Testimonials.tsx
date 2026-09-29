// import { useCallback, useEffect, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
// import { Card } from '@/components/ui/Card';
// import { testimonials } from '@/data/testimonials';
// import { cn } from '@/lib/utils';

// export function Testimonials() {
//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [paused, setPaused] = useState(false);
//   const count = testimonials.length;

//   const go = useCallback(
//     (dir: number) => {
//       setDirection(dir);
//       setIndex((prev) => (prev + dir + count) % count);
//     },
//     [count]
//   );

//   useEffect(() => {
//     if (paused) return;
//     const timer = setInterval(() => go(1), 6000);
//     return () => clearInterval(timer);
//   }, [go, paused]);

//   const t = testimonials[index];

//   return (
//     <div className="mx-auto max-w-3xl space-y-6">
//       <div>
//         <h2 className="text-xl font-bold text-foreground">Testimonials</h2>
//         <p className="mt-1 text-sm text-muted">What clients say about working with me</p>
//       </div>

//       <Card
//         className="relative overflow-hidden p-8 lg:p-10"
//         onMouseEnter={() => setPaused(true)}
//         onMouseLeave={() => setPaused(false)}
//       >
//         <Quote className="absolute top-6 right-6 h-16 w-16 text-accent/10" />
//         <div className="relative min-h-52">
//           <AnimatePresence mode="wait" initial={false}>
//             <motion.div
//               key={t.id}
//               initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="mb-4 flex gap-1">
//                 {Array.from({ length: t.rating }).map((_, i) => (
//                   <Star key={i} className="h-4 w-4 fill-accent text-accent" />
//                 ))}
//               </div>
//               <p className="mb-6 leading-relaxed text-balance text-foreground">"{t.content}"</p>
//               <div className="flex items-center gap-3">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 font-semibold text-accent">
//                   {t.name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-foreground">{t.name}</p>
//                   <p className="text-sm text-dim">
//                     {t.role} at {t.company}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <div className="mt-6 flex items-center justify-between">
//           <div className="flex gap-1.5">
//             {testimonials.map((item, i) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   setDirection(i > index ? 1 : -1);
//                   setIndex(i);
//                 }}
//                 className={cn(
//                   'h-2 rounded-full transition-all',
//                   i === index ? 'w-6 bg-accent' : 'w-2 bg-surface-2 hover:bg-accent/40'
//                 )}
//                 aria-label={`Go to testimonial ${i + 1}`}
//               />
//             ))}
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => go(-1)}
//               className="rounded-lg border border-line bg-surface-2 p-2 text-muted transition-all hover:border-accent/30 hover:text-accent"
//               aria-label="Previous testimonial"
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => go(1)}
//               className="rounded-lg border border-line bg-surface-2 p-2 text-muted transition-all hover:border-accent/30 hover:text-accent"
//               aria-label="Next testimonial"
//             >
//               <ChevronRight className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }