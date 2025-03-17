export type SessionType = {
  id: number;
  firstNameEn: string;
  lastNameEn: string;
  userIdentifierEn: string;
  degree: number;
  imageUrl: string;
  position: string;
  positionFA: string;
  universityEmail: string;
  personalEmail: string;
  phone: string;
  mobileNumber: string;
  areaOfStudy: string;
  areaOfStudyFA: string;
  research: string;
  researchFA: string;
  membershipFa: string;
  membershipEn: string;
  affiliation: string;
  citedBy: number;
  personnelCode: string;
  nationalCode: number;
  firstNameFa: string;
  lastNameFa: string;
  scopusID: string;
  webOfScienceID: string;
  googleScholarID: string;
  biographyEn: string;
  biographyFa: string;
  professionalActivityEn: string;
  professionalActivityFa: string;
  teachingInterestEn: string;
  teachingInterestFa: string;
  employeeNumber: number;
  financialCode: number;
  identificationNumber: number;
  lastEdit: string;
  password: string;
  roleId: number;
  role: {
    id: number;
    name: string;
    description: string;
    users: string[];
    role_Actions: {
      id: number;
      name: string;
      url: string;
      isTargetBlank: true;
      roleParentId: number;
      roleId: number;
      role: string;
    }[];
  };
  departmentId: number;
  department: {
    id: number;
    title: string;
    titleFa: string;
    facultyId: number;
    faculty: {
      id: number;
      title: string;
      titleFa: string;
    };
  };
  socialMedia: {
    id: number;
    linkedIn: string;
    orcid: string;
    researchGate: string;
    personalWebsite: string;
    scholar: string;
    scopus: string;
    isi: string;
    isc: string;
    faceBook: string;
    gmail: string;
    instagram: string;
    twitter: string;
    webOfScience: string;
    mendeley: string;
    academia: string;
    eitaa: string;
  };
  webLinks: {
    id: number;
    title: string;
    titleFa: string;
    link: string;
  }[];

  articles: {
    id: number;
    title: string;
    titleFa: string;
    link: string;
  }[];

  memberships: {
    id: number;
    title: string;
    titleFa: string;
  }[];

  professionalActivities: {
    id: number;
    title: string;
    titleFa: string;
  }[];

  teachingInterests: {
    id: number;
    title: string;
    titleFa: string;
  }[];

  courses: {
    id: number;
    title: string;
    titleFa: string;
  }[];

  researchAreas: {
    id: number;
    title: string;
    titleFa: string;
  }[];

  educations: {
    title: string;
    titleFa: string;
    universityFa: string;
    universityEn: string;
    degree: number;
    countryFa: string;
    countryEn: string;
    cityFa: string;
    cityEn: string;
  }[];

  books: {
    id: number;
    professorProfileId: number;
    professorProfile: string;
    title: string;
    listDisplayTitle: string;
    author: string;
    imageUrl: string;
    rate: number;
    publisher: string;
    publishYear: number;
    language: string;
    overview: string;
    demoUrl: string;
    translators: string;
    contents: {
      id: number;
      title: string;
      bookId: number;
      book: string;
    }[];

    comments: {
      id: number;
      name: string;
      email: string;
      rate: number;
      imageUrl: string;
      content: string;
      bookId: number;
      book: string;
    }[];

    otherBooks: {
      id: number;
      title: string;
      bookId: number;
      book: string;
    }[];

    categories: {
      id: number;
      title: string;
      bookId: number;
      book: string;
    }[];

    availableStores: {
      id: number;
      title: string;
      bookId: number;
      book: string;
      link: string;
    }[];

    relatedBooks: {
      id: number;
      title: string;
      bookId: number;
      book: string;
      imageUrl: string;
      authorName: string;
    }[];

    authorsInfo: {
      id: number;
      fullName: string;
      imageUrl: string;
      description: string;
      bookId: number;
      book: string;
    }[];

    isbn: string;
  }[];
};
