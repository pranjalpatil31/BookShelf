# 📚 Cloud-Native Bookshelf Application  
*Search. Organize. Track. — Powered by the Cloud.*

A full-stack cloud-native web application demonstrating real-world implementation of five core cloud service models — **IaaS, PaaS, DBaaS, Storage-as-a-Service, and SECaaS**.

---

## 📋 Table of Contents
- Overview  
- Architecture  
- Tech Stack  
- AWS Service Integration     
- GraphQL Operations 
- License  

---

## 📖 Overview

Cloud-Native Bookshelf is a dynamic web application designed to help users discover, organize, and manage books in a personalized digital environment.

The application integrates external book data with cloud-based storage and authentication to provide a seamless experience.

### Key Capabilities

- Secure user authentication  
- Real-time book search using Google Books API  
- Personalized bookshelf management  
- Categorization based on reading progress  
- Favorite marking system  
- Easy book removal and updates  

---

## 🏗️ Architecture

### System Architecture

```

┌───────────────────────────────────────────────────────────────┐
│                    USER INTERFACE LAYER                       │
│                  (AWS Amplify - PaaS)                         │
│   React + Vite   │   Material UI   │   Cognito Auth           │
└───────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌───────────────────────────────────────────────────────────────┐
│                 APPLICATION / API LAYER                       │
│        (AWS AppSync + CDK - IaaS + Managed Services)          │
│     GraphQL API │ Queries │ Mutations │ Authorization         │
└───────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌───────────────────────────────────────────────────────────────┐
│                     DATA STORAGE LAYER                        │
│                  (DynamoDB - DBaaS)                           │
│           User Bookshelf Data & Metadata                      │
└───────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌───────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICE LAYER                       │
│                  (Google Books API)                           │
│           Book Search & Metadata Retrieval                    │
└───────────────────────────────────────────────────────────────┘

```


## 🛠️ Tech Stack

Frontend -	React + Vite
UI System	- Material UI
Backend API -	GraphQL (AWS AppSync via CDK)
Database -	DynamoDB
Authentication - Amazon Cognito
Deployment -	AWS Amplify
Cloud Platform -	AWS
External Data	- Google Books API
---

## ☁️ AWS Service Integration

### Cloud Service Model Mapping

| Service Model        | AWS Service    | Role                           |
|----------------------|----------------|--------------------------------|
| IaaS                 | AWS CDK        | Infrastructure provisioning    |
| PaaS                 | AWS Amplify    | Hosting & CI/CD                |
| DBaaS                | DynamoDB       | Data storage                   |
| Storage-as-a-Service | Amazon S3      | Static asset hosting           |
| SECaaS               | Amazon Cognito | Authentication & authorization |

---

## 🔐 Deployment & Security

- Hosted on AWS Amplify with CI/CD pipeline  
- GitHub-integrated automatic deployments  
- Secure authentication using Amazon Cognito  
- Role-based and token-based access control  


---

### GraphQL Operations

#### Fetch Books
```

query ListBooks {
listBooks {
id
title
status
isFavorite
}
}

```

#### Add Book
```

mutation CreateBook {
createBook(input: {
title: "Book Name",
status: "TO_READ"
}) {
id
}
}

```

#### Update Book Status
```

mutation UpdateBook {
updateBook(input: {
id: "book-id",
status: "READING"
}) {
status
}
}

```

#### Delete Book
```

mutation DeleteBook {
deleteBook(input: {
id: "book-id"
}) {
id
}
}

```

## 📊 Conclusion

This project demonstrates the successful design and deployment of a **cloud-based web application on a public cloud platform**.

It integrates:

- IaaS (Infrastructure provisioning)  
- PaaS (Application hosting)  
- DBaaS (Managed database)  
- Storage as a Service  
- Security as a Service  

The application showcases scalability, security, and modern cloud architecture principles, fulfilling the requirements of a Cloud Computing Mini Project.

---

## 📄 License

This project is intended for academic and educational use.
```

---

