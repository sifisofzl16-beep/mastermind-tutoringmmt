"use client";

export default function MastermindTutoringWebsite() {
    const bookingFormLink =
        "https://docs.google.com/forms/d/e/1FAIpQLSeFR9P04-aA_vJJIEukzNpAygBJl8CHMeuaDZIjaN_tiQrwlQ/viewform";

    const tutorApplicationLink =
        "https://docs.google.com/forms/d/e/1FAIpQLSeD6l_WL1IftliSprtDEADDjadc88V1zAKaDap2cSQAtX3sRg/viewform";

    const whatsappLink = "https://wa.me/27660397779";

    const images = {
        hero:
            "https://givingmore.co.za/media/com_jbusinessdirectory/pictures/companies/10836/Tutor_House_Intro_1688724894.webp",
        oneOnOne:
            "https://media.istockphoto.com/id/1370735949/photo/teen-girl-gestures-while-explaining-something-to-female-teacher.jpg?s=612x612&w=0&k=20&c=I5K1JIPSRCNJTMuhhW0VDEmx9qiPUi7i7o_8BDKZG9g=",
        group:
            "https://media.istockphoto.com/id/1324197549/pt/foto/young-woman-giving-speech-in-classroom.jpg?s=612x612&w=0&k=20&c=yMIz21rMMm8WP6o41FM7TsKVOslb6-2hqC9l6DLEXqI=",
        leadership:
            "https://img.freepik.com/free-photo/two-coworkers-analyzing-documents_329181-20191.jpg?semt=ais_rp_progressive&w=740&q=80",
    };

    const packages = [
        {
            name: "Foundation Package",
            price: "R200 – R280 per session",
            ideal:
                "For first-year students and standard support needs where strong fundamentals, regular guidance, and confidence-building matter most.",
            features: [
                "First-year & introductory modules",
                "Concept building & weekly support",
                "Assignment & homework guidance",
                "Online sessions usually lower cost",
            ],
            badge: "Starter",
        },
        {
            name: "Momentum Package",
            price: "R250 – R350 per session",
            ideal:
                "Designed for second-year core modules where consistency, test preparation, and deeper understanding are required.",
            features: [
                "Core technical modules",
                "Past paper & test prep focus",
                "Consistent structured support",
                "Most Popular option",
            ],
            badge: "Most Popular",
        },
        {
            name: "Mastery Package",
            price: "R300 – R450 per session",
            ideal:
                "For advanced and high-difficulty modules where deep understanding and high-performance support are essential.",
            features: [
                "Advanced modules",
                "High-performance tutoring",
                "Deep problem-solving",
                "Exam-focused strategy",
            ],
            badge: "Advanced",
        },
    ];

    const tutorProfiles = [
        [
            "Lethabo Mokoena",
            "Engineering Mathematics and Calculus tutor focused on helping first-year students build strong problem-solving confidence.",
        ],
        [
            "Jason van der Merwe",
            "Thermodynamics and Fluid Mechanics specialist, helping students master difficult core engineering modules.",
        ],
        [
            "Priyesh Naidoo",
            "Physics and Chemistry tutor with a strong focus on exam preparation and simplifying complex concepts.",
        ],
    ];

    const reviews = [
        {
            name: "Aiden van der Merwe",
            detail: "Mechanical Engineering, Wits",
            quote:
                "MMT helped me finally understand the module I was struggling with. The tutor was sharp and explained things clearly.",
        },
        {
            name: "Priya Naidoo",
            detail: "BSc, Wits",
            quote:
                "Structured sessions, professional tutors, and real improvement before tests.",
        },
        {
            name: "Sibusiso Mthembu",
            detail: "Chemical Engineering, Wits",
            quote:
                "Professional, focused, and effective. Exactly what I needed.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <section className="mx-auto max-w-7xl px-6 py-20">
                <h1 className="text-5xl font-bold">
                    Excellence made <span className="text-cyan-300">understandable</span>
                </h1>
                <p className="mt-4 text-slate-300 max-w-xl">
                    Mastermind Tutoring connects university students with high-performing tutors across demanding academic modules.
                </p>
            </section>

            <section id="packages" className="mx-auto max-w-7xl px-6 py-20">
                <h2 className="text-3xl font-bold mb-10">Packages</h2>
                <div className="grid gap-6 lg:grid-cols-3">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.name}
                            className="rounded-2xl border border-white/10 p-6 bg-white/5"
                        >
                            <h3 className="text-xl font-semibold">{pkg.name}</h3>
                            <p className="text-cyan-300 text-2xl mt-2">{pkg.price}</p>
                            <p className="mt-4 text-slate-300">{pkg.ideal}</p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-300">
                                {pkg.features.map((f) => (
                                    <li key={f}>• {f}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-slate-400 text-sm">
                    Pricing varies based on module difficulty, year of study, and tutoring format.
                </p>
            </section>

            <section id="tutors" className="mx-auto max-w-7xl px-6 py-20">
                <h2 className="text-3xl font-bold mb-10">Tutor Profiles</h2>
                <div className="grid gap-6 lg:grid-cols-3">
                    {tutorProfiles.map(([name, bio], index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6"
                        >
                            <p className="text-xs uppercase text-cyan-300">Tutor</p>
                            <h3 className="text-xl font-semibold mt-2">{name}</h3>
                            <p className="mt-3 text-slate-300">{bio}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {reviews.map((r) => (
                        <div
                            key={r.name}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6"
                        >
                            <p className="text-cyan-300 text-sm">{r.name}</p>
                            <p className="text-slate-400 text-sm">{r.detail}</p>
                            <p className="mt-3 text-slate-200">“{r.quote}”</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
                <h2 className="text-3xl font-bold">Contact</h2>
                <div className="mt-6 text-slate-300 space-y-2">
                    <p>Fezile: 0660397779</p>
                    <p>Thandeka: 0655112416</p>
                    <p>Email: mastermindtutoring@gmail.com</p>
                </div>
            </section>

            <footer className="border-t border-white/10 px-6 py-10 text-sm text-slate-400">
                <p className="text-white font-semibold">Mastermind Tutoring (MMT)</p>
                <p>Excellence made understandable.</p>
                <p className="mt-2">
                    Leadership: Fezile Sifiso Nkosi (Founder) • Thandeka Valelo (COO)
                </p>
            </footer>
        </div>
    );
}