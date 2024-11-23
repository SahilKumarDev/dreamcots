import {
  Home,
  LayoutDashboard,
  School,
  User2,
  UserCheck2,
  UserCheckIcon,
} from "lucide-react";

export const projects = [
  {
    id: 1,
    name: "Dashboard",
    icon: LayoutDashboard,
    isActive: true,
    url: "/dashboard",
  },
  {
    id: 2,
    name: "user",
    icon: User2,
    url: "/users",
  },
  {
    id: 3,
    name: "Student",
    icon: UserCheckIcon,
    url: "/students",
  },
  {
    id: 4,
    name: "Teacher",
    icon: UserCheck2,
    url: "/teachers",
  },
  {
    id: 5,
    name: "School-college",
    icon: School,
    url: "/schools-colleges",
  },
  {
    id: 6,
    name: "Room",
    icon: Home,
    url: "/rooms",
  },
];
  

export const dummyData  = [
  {
    id: "t1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    phoneNumber: "(555) 123-4567",
    yearsOfExperience: 12,
    teachingSubjects: ["Physics", "Mathematics"],
    highestQualification: "Ph.D. Physics"
  },
  {
    id: "t2",
    name: "Prof. Michael Chen",
    email: "m.chen@school.edu",
    phoneNumber: "(555) 234-5678",
    yearsOfExperience: 8,
    teachingSubjects: ["Chemistry", "Biology"],
    highestQualification: "M.Sc. Chemistry"
  },
  {
    id: "t3",
    name: "Mrs. Emily Davis",
    email: "emily.d@school.edu",
    phoneNumber: "(555) 345-6789",
    yearsOfExperience: 15,
    teachingSubjects: ["English Literature", "Creative Writing"],
    highestQualification: "M.A. English"
  },
  {
    id: "t4",
    name: "Mr. Robert Wilson",
    email: "r.wilson@school.edu",
    phoneNumber: "(555) 456-7890",
    yearsOfExperience: 6,
    teachingSubjects: ["History", "Social Studies"],
    highestQualification: "B.A. History"
  },
  {
    id: "t5",
    name: "Ms. Maria Garcia",
    email: "m.garcia@school.edu",
    phoneNumber: "(555) 567-8901",
    yearsOfExperience: 10,
    teachingSubjects: ["Spanish", "French"],
    highestQualification: "M.A. Languages"
  },
  {
    id: "t6",
    name: "Dr. James Thompson",
    email: "j.thompson@school.edu",
    phoneNumber: "(555) 678-9012",
    yearsOfExperience: 20,
    teachingSubjects: ["Computer Science", "Mathematics"],
    highestQualification: "Ph.D. Computer Science"
  },
  {
    id: "t7",
    name: "Mrs. Lisa Brown",
    email: "l.brown@school.edu",
    phoneNumber: "(555) 789-0123",
    yearsOfExperience: 9,
    teachingSubjects: ["Art", "Design"],
    highestQualification: "B.F.A. Fine Arts"
  },
  {
    id: "t8",
    name: "Mr. David Kim",
    email: "d.kim@school.edu",
    phoneNumber: "(555) 890-1234",
    yearsOfExperience: 7,
    teachingSubjects: ["Music", "Drama"],
    highestQualification: "M.Mus. Performance"
  },
  {
    id: "t9",
    name: "Dr. Rachel Green",
    email: "r.green@school.edu",
    phoneNumber: "(555) 901-2345",
    yearsOfExperience: 11,
    teachingSubjects: ["Biology", "Environmental Science"],
    highestQualification: "Ph.D. Biology"
  },
  {
    id: "t10",
    name: "Prof. Thomas Anderson",
    email: "t.anderson@school.edu",
    phoneNumber: "(555) 012-3456",
    yearsOfExperience: 14,
    teachingSubjects: ["Physics", "Astronomy"],
    highestQualification: "Ph.D. Astrophysics"
  }
]; 