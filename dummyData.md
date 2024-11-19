<!--  DashBoard  sidebar data -->
1. dashboardData
6. food
7. user
7. chat 
2. Students
   a. Recent Student 
   b. All Students
3. Teachers
   a. Recent Teachers 
   b. All Teachers



<!-- Teacher data -->
# **Teacher Schema Documentation**

## **Overview**
The `Teacher` schema defines the structure of a teacher's information in the database. It includes personal details, professional details, teaching specifics, and associated enums.

---

## **Schema Structure**

### **ITeacher**

| Field                        | Type                | Description                              | Required |
|------------------------------|---------------------|------------------------------------------|----------|
| `name`                       | `string`            | Full name of the teacher                | Yes      |
| `uniqueName`                 | `string`            | Unique identifier for the teacher       | Yes      |
| `email`                      | `string`            | Email address                           | Yes      |
| `phoneNumber`                | `number`            | Contact phone number                    | Yes      |
| `profilePicture`             | `string`            | URL of the profile picture              | Yes      |
| `coaching`                   | `ITeacherCoaching`  | Coaching-related details                | Yes      |
| `skills`                     | `string[]`          | List of teacher skills                  | Yes      |
| `yearsOfExperience`          | `string`            | Teaching experience in years            | Yes      |
| `isFullTime`                 | `boolean`           | Employment status                       | Yes      |
| `emergencyContact`           | `number`            | Emergency contact number                | Yes      |
| `gender`                     | `ITeacherGender`    | Gender (Male/Female)                    | Yes      |
| `teachingSubjects`           | `string[]`          | Subjects the teacher specializes in     | Yes      |
| `highestQualification`       | `string`            | Highest academic qualification          | Yes      |
| `teachingSchoolOrCollege`    | `string`            | Current teaching institution            | Yes      |
| `languages`                  | `string[]`          | Languages the teacher speaks            | Yes      |
| `socialMedia`                | `string[]`          | Social media profile URLs               | Yes      |
| `highestTeachingClassOrDegree` | `string`          | Highest level or degree taught          | Yes      |
| `availability`               | `ITeacherAvailability` | Part-time or Full-time availability  | Yes      |
| `address`                    | `IAddress`          | Address details                         | Yes      |

---

### **IAddress**

| Field        | Type     | Description         | Required |
|--------------|----------|---------------------|----------|
| `street`     | `string` | Street name         | Yes      |
| `city`       | `string` | City name           | Yes      |
| `state`      | `string` | State name          | Yes      |
| `postalCode` | `string` | Postal code         | Yes      |
| `country`    | `string` | Country name        | Yes      |

---

### **ITeacherCoaching**

| Field        | Type      | Description                    | Required |
|--------------|-----------|--------------------------------|----------|
| `isCoaching` | `boolean` | Indicates if coaching is offered | Yes    |
| `location`   | `string`  | Location of coaching           | No       |
| `fees`       | `number`  | Coaching fees                  | No       |
| `time`       | `string`  | Coaching schedule              | No       |

---

### **Enums**

#### **ITeacherGender**

| Value     | Description  |
|-----------|--------------|
| `MALE`    | Male gender  |
| `FEMALE`  | Female gender|

#### **ITeacherAvailability**

| Value      | Description         |
|------------|---------------------|
| `PART`     | Part-time availability |
| `FULL`     | Full-time availability |

---

## **Usage**

### **Importing the Schema**

```typescript
import { Teacher } from "./models/Teacher";

// Example Usage
const newTeacher = new Teacher({
  name: "John Doe",
  uniqueName: "john_doe_123",
  email: "john.doe@example.com",
  phoneNumber: 1234567890,
  profilePicture: "https://example.com/pic.jpg",
  coaching: {
    isCoaching: true,
    location: "City Center",
    fees: 500,
    time: "9 AM - 12 PM",
  },
  skills: ["Mathematics", "Physics"],
  yearsOfExperience: "5",
  isFullTime: true,
  emergencyContact: 9876543210,
  gender: "MALE",
  teachingSubjects: ["Math", "Science"],
  highestQualification: "PhD",
  teachingSchoolOrCollege: "XYZ High School",
  languages: ["English", "Spanish"],
  socialMedia: ["https://linkedin.com/in/johndoe"],
  highestTeachingClassOrDegree: "Class 12",
  availability: "FULL",
  address: {
    street: "123 Main St",
    city: "Metropolis",
    state: "New York",
    postalCode: "12345",
    country: "USA",
  },
});
await newTeacher.save();
```
