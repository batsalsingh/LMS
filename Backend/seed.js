const dotenv = require("dotenv");
const connectDB = require("./server/src/config/db");
const User = require("./server/src/models/User");
const Course = require("./server/src/models/Course");
const TutorProfile = require("./server/src/models/TutorProfile");

dotenv.config();

const seedCourses = [
  {
    title: "Web Development Fundamentals",
    description: "Build responsive websites with HTML, CSS, and JavaScript.",
    category: "Web Development",
    level: "Beginner",
    durationWeeks: 8,
    rating: 4.8,
    price: 49,
    thumbnailEmoji: "🌐",
    modules: [
      {
        title: "Getting Started",
        lessons: [
          { title: "How the Web Works", content: "Intro to browsers and servers.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", durationMin: 12 },
          { title: "HTML Foundations", content: "Structure and semantic tags.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", durationMin: 15 }
        ]
      },
      {
        title: "Styling Basics",
        lessons: [
          { title: "CSS Selectors", content: "Apply styles effectively.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", durationMin: 14 }
        ]
      }
    ]
  },
  {
    title: "Advanced React Patterns",
    description: "Master reusable, scalable React component architecture.",
    category: "Web Development",
    level: "Advanced",
    durationWeeks: 6,
    rating: 4.9,
    price: 59,
    thumbnailEmoji: "⚛️",
    modules: [
      {
        title: "React Architecture",
        lessons: [
          { title: "Component Design", content: "Composability and reuse.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", durationMin: 18 },
          { title: "Custom Hooks", content: "Extract reusable state logic.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", durationMin: 20 }
        ]
      }
    ]
  },
  {
    title: "Python for Data Science",
    description: "Analyze datasets and build insights using Python tools.",
    category: "Data Science",
    level: "Intermediate",
    durationWeeks: 10,
    rating: 4.7,
    price: 69,
    thumbnailEmoji: "📊",
    modules: [
      {
        title: "Data Analysis Toolkit",
        lessons: [
          { title: "NumPy Essentials", content: "Arrays and operations.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", durationMin: 16 },
          { title: "Pandas for Analysis", content: "Dataframes and cleaning.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", durationMin: 22 }
        ]
      }
    ]
  },
  {
    title: "UI/UX Design Principles",
    description: "Design clean and user-focused experiences from scratch.",
    category: "Design",
    level: "Beginner",
    durationWeeks: 7,
    rating: 4.8,
    price: 49,
    thumbnailEmoji: "🎨",
    modules: [
      {
        title: "UX Foundations",
        lessons: [
          { title: "Design Thinking", content: "Empathy and ideation.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", durationMin: 13 }
        ]
      }
    ]
  },
  {
    title: "Mobile App Development",
    description: "Create modern mobile apps with practical architecture.",
    category: "Mobile Development",
    level: "Advanced",
    durationWeeks: 10,
    rating: 4.7,
    price: 69,
    thumbnailEmoji: "📱",
    modules: [
      {
        title: "Mobile Core Concepts",
        lessons: [
          { title: "Navigation Patterns", content: "Build intuitive mobile flows.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", durationMin: 17 }
        ]
      }
    ]
  },
  {
    title: "Cloud Computing with AWS",
    description: "Deploy, scale, and monitor cloud-native applications.",
    category: "Cloud",
    level: "Intermediate",
    durationWeeks: 9,
    rating: 4.8,
    price: 69,
    thumbnailEmoji: "☁️",
    modules: [
      {
        title: "Cloud Basics",
        lessons: [
          { title: "Compute and Storage", content: "Understand core cloud services.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", durationMin: 19 }
        ]
      }
    ]
  }
];

const defaultTutors = [
  { name: "John Smith", speciality: "Web Development", rating: 4.9, students: 2450, experience: "8+ years", image: "👨‍🏫" },
  { name: "Sarah Johnson", speciality: "React & JavaScript", rating: 4.8, students: 1890, experience: "6+ years", image: "👩‍💼" },
  { name: "Mike Chen", speciality: "Data Science", rating: 5.0, students: 3120, experience: "10+ years", image: "👨‍🔬" }
];

const seed = async () => {
  await connectDB();
  await Course.deleteMany({});

  let instructor = await User.findOne({ email: "instructor@lumined.dev" });
  if (!instructor) {
    instructor = await User.create({
      name: "Lumin Instructor",
      email: "instructor@lumined.dev",
      password: "Pass@1234",
      role: "instructor"
    });
  }

  const existingCourses = await Course.countDocuments();
  if (existingCourses === 0) {
    await Course.insertMany(seedCourses.map((course) => ({ ...course, instructor: instructor._id })));
  } else {
    const courses = await Course.find();
    await Promise.all(
      courses.map(async (course) => {
        if (!course.modules || course.modules.length === 0) {
          const source = seedCourses.find((item) => item.title === course.title) || seedCourses[0];
          course.modules = source.modules;
          await course.save();
        }
      })
    );
  }

  const existingTutors = await TutorProfile.countDocuments();
  if (existingTutors === 0) {
    await TutorProfile.insertMany(defaultTutors);
  }

  console.log("Seed complete.");
  console.log("Instructor login: instructor@lumined.dev / Pass@1234");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
