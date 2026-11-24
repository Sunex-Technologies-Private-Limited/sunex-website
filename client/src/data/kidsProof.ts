/*
 * REAL PROOF GOES HERE. Each section on the Kids page appears automatically once it has entries and stays hidden while empty,
 * so the page never shows made-up reviews or placeholder photos. Only add real children's work with the parent's written consent.
 *
 * Examples (copy one into the list below):
 *   projects:     { title: "Star-chasing game", child: "Aanya, 10", course: "Scratch", video: "https://www.youtube.com/watch?v=XXXX" }
 *   testimonials: { quote: "My son now explains loops to his friends.", parent: "Parent of Rohan, 11", course: "Python" }
 *   mentors:      { name: "Name", role: "Lead mentor, Scratch", bio: "One line about experience.", photo: "/images/mentor-name.jpg" }
 */
export type KidsProject = { title: string; child: string; course: string; video: string };
export type KidsTestimonial = { quote: string; parent: string; course: string };
export type KidsMentor = { name: string; role: string; bio: string; photo?: string };

export const kidsProjects: KidsProject[] = [];
export const kidsTestimonials: KidsTestimonial[] = [];
export const kidsMentors: KidsMentor[] = [];
