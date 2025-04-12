import { axiosInstance } from "@/api/axios-instance";
import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

export interface EditAboutMeType {
  id?: number;
  universityEmail?: string;
  personalEmail?: string;
  phone?: string;
  mobileNumber?: string;
  biographyEn?: string;
  biographyFa?: string;
  lastName?: string;
  firstName?: string;
}

export interface EditResearchType {
  id?: number;
  areaOfStudy?: string;
  areaOfStudyFa?: string;
  research?: string;
  researchFA?: string;
  membershipEn?: string;
  membershipFa?: string;
  researchAreas?: {
    title?: string;
    titleFa?: string;
  }[];

  professionalActivityEn?: string;
  professionalActivityFa?: string;
  professionalActivities?: {
    title?: string;
    titleFa?: string;
  }[];

  memberships?: {
    title?: string;
    titleFa?: string;
  }[];
}

export interface EditEducationType {
  id?: number;
  teachingInterestEn?: string;
  teachingInterestFa?: string;
  teachingInterests?: {
    title?: string;
    titleFa?: string;
  }[];

  educations?: {
    title?: string;
    titleFa?: string;
    universityFa?: string;
    universityEn?: string;
    degree?: number | string;
    countryFa?: string;
    countryEn?: string;
    cityFa?: string;
    cityEn?: string;
  }[];
}

export interface EditSocialLinksType {
  id?: number;
  webOfScience?: string;
  linkedIn?: string;
  orcid?: string;
  researchGate?: string;
  personalWebsite?: string;
  googleScholar?: string;
  scopus?: string;
  isi?: string;
  facebook?: string;
  gmail?: string;
  instagram?: string;
  twitter?: string;
  mendeley?: string;
  academia?: string;
  eitaa?: string;
  isc?: string;
  webLinks?: {
    title?: string;
    titleFa?: string;
    link?: string;
  }[];
}

const ABOUTME_API_ENDPOINT = "Professor/UpdateOverviewOfProfessor";
const RESEARCH_API_ENDPOINT = "Professor/UpdateResearchInformationOfProfessor";
const EDUCATION_API_ENDPOINT = "Professor/UpdateEducationOfProfessor";
const SOCIAL_LINKS_API_ENDPOINT = "Professor/UpdateSocialNetworksOfProfessor";

export const editAboutMeProfile = async (data: EditAboutMeType) => {
  await apiResponseMiddleware<unknown>(
    axiosInstance.post(ABOUTME_API_ENDPOINT, data),
    () => {
      toast.success("اطلاعات با موفقیت ذخیره شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true,
      loadingMessage: "درحال ذخیره اطلاعات"
    }
  );
};

export const editResearchProfile = async (data: EditResearchType) => {
  await apiResponseMiddleware<unknown>(
    axiosInstance.post(RESEARCH_API_ENDPOINT, data),
    () => {
      toast.success("اطلاعات با موفقیت ذخیره شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true,
      loadingMessage: "درحال ذخیره اطلاعات"
    }
  );
};

export const editEducationProfile = async (data: EditEducationType) => {
  await apiResponseMiddleware<unknown>(
    axiosInstance.post(EDUCATION_API_ENDPOINT, data),
    () => {
      toast.success("اطلاعات با موفقیت ذخیره شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true,
      loadingMessage: "درحال ذخیره اطلاعات"
    }
  );
};

export const editSocialLinksProfile = async (data: EditSocialLinksType) => {
  await apiResponseMiddleware<unknown>(
    axiosInstance.post(SOCIAL_LINKS_API_ENDPOINT, data),
    () => {
      toast.success("اطلاعات با موفقیت ذخیره شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true,
      loadingMessage: "درحال ذخیره اطلاعات"
    }
  );
};
