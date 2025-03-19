import { useState } from "react";

import { editSocialLinksProfile, EditSocialLinksType } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "@/hooks/server-state/use-session";

import SaveButton from "../_components/save-button";
import Textfield from "../_components/textfield";
import WebLinkTextfieldRepeater from "../_components/weblink-textfield-repeater";

const EditProfileSocialLinks = () => {
  const { data: profileData } = useSession();

  const [editData, setEditData] = useState<EditSocialLinksType>({
    id: profileData?.id,
    webLinks: profileData?.webLinks,
    academia: profileData?.socialMedia?.academia,
    eitaa: profileData?.socialMedia?.eitaa,
    facebook: profileData?.socialMedia?.faceBook,
    gmail: profileData?.socialMedia?.gmail,
    googleScholar: profileData?.socialMedia?.scholar,
    instagram: profileData?.socialMedia?.instagram,
    isc: profileData?.socialMedia?.isc,
    isi: profileData?.socialMedia?.isi,
    linkedIn: profileData?.socialMedia?.linkedIn,
    mendeley: profileData?.socialMedia?.mendeley,
    orcid: profileData?.socialMedia?.orcid,
    personalWebsite: profileData?.socialMedia?.personalWebsite,
    researchGate: profileData?.socialMedia?.researchGate,
    scopus: profileData?.socialMedia?.scopus,
    twitter: profileData?.socialMedia?.twitter,
    webOfScience: profileData?.socialMedia?.webOfScience
  });

  const queryClient = useQueryClient();

  const mutateData = useMutation({
    mutationFn: (data: EditSocialLinksType) => editSocialLinksProfile(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["session"] })
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateData.mutate(editData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="px-10 pb-10">
        <h2 className="mb-6">شبکه‌های اجتماعی پژوهشی</h2>
        <div
          className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2"
          dir="ltr"
        >
          <Textfield
            defaultValue={profileData?.socialMedia?.linkedIn}
            onChange={(e) => {
              setEditData((prev) => ({
                ...prev,
                linkedIn: e.target.value
              }));
            }}
            label={
              <div className="flex items-center gap-x-1 [&_svg]:size-4">
                <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m116 3h-104a8.91 8.91 0 0 0 -9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81v-104.42a8.93 8.93 0 0 0 -9-8.77z"
                    fill="#0076b2"
                  />
                  <g fill="#fff">
                    <path d="m21.06 48.73h18.11v58.27h-18.11zm9.06-29a10.5 10.5 0 1 1 -10.5 10.49 10.5 10.5 0 0 1 10.5-10.49" />
                    <path d="m50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41 18.34-.04 21.74 12.03 21.74 27.68v32h-18.11v-28.35c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15v28.79h-18.08z" />
                  </g>
                </svg>
                Linkedin
              </div>
            }
          />
          <Textfield
            defaultValue={profileData?.socialMedia?.researchGate}
            onChange={(e) => {
              setEditData((prev) => ({
                ...prev,
                researchGate: e.target.value
              }));
            }}
            label={
              <div className="flex items-center gap-x-1 [&_svg]:size-4">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="#00d0af" height="512" rx="15%" width="512" />
                  <g fill="#feffff">
                    <path d="m271 383c-15-4-23-10-36-26-9-12-26-39-35-53l-6-11h-24v34c1 43 0 42 19 45l10 1v4 4h-80v-4c0-4 1-4 9-6 10-2 14-5 15-14 1-4 1-31 1-79 0-70-1-72-3-77-3-5-7-7-18-8-4-1-5-1-5-5v-4l43-1c55-1 65 0 81 11 15 10 22 24 20 43-1 21-17 42-37 50-4 1-7 3-7 3 0 2 17 28 28 43 15 21 27 32 36 37 4 2 9 3 10 3 3 0 3 1 3 4s-1 5-2 5c-5 2-19 2-26 0zm-57-109c14-7 22-18 23-35 1-13-2-22-10-30-9-10-25-14-48-12l-10 1v39c0 36 0 40 2 40 1 0 9 1 18 0 14 0 17-1 24-4z" />
                    <path d="m321 228c-25-4-34-20-32-61 1-21 3-30 11-38 7-7 13-9 25-10 13-1 21 2 29 8 5 4 9 10 9 13 0 1-3 2-6 4l-6 3-3-3c-5-6-9-9-14-11-10-3-20 2-25 11-3 5-3 6-3 29 0 22 0 25 3 29 4 7 12 11 21 10 13-1 20-10 20-24v-7h-10-10v-13h36v15c0 12-1 16-3 22-6 15-23 24-42 22z" />
                  </g>
                </svg>
                ResearchGate
              </div>
            }
          />
          <Textfield
            defaultValue={profileData?.socialMedia?.mendeley}
            onChange={(e) => {
              setEditData((prev) => ({
                ...prev,
                mendeley: e.target.value
              }));
            }}
            label={
              <div className="flex items-center gap-x-1 [&_svg]:size-4 [&_svg]:rounded-sm [&_svg]:bg-[#A91B27] [&_svg]:fill-white [&_svg]:px-0.5">
                <svg
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M624.6 325.2c-12.3-12.4-29.7-19.2-48.4-17.2-43.3-1-49.7-34.9-37.5-98.8 22.8-57.5-14.9-131.5-87.4-130.8-77.4.7-81.7 82-130.9 82-48.1 0-54-81.3-130.9-82-72.9-.8-110.1 73.3-87.4 130.8 12.2 63.9 5.8 97.8-37.5 98.8-21.2-2.3-37 6.5-53 22.5-19.9 19.7-19.3 94.8 42.6 102.6 47.1 5.9 81.6-42.9 61.2-87.8-47.3-103.7 185.9-106.1 146.5-8.2-.1.1-.2.2-.3.4-26.8 42.8 6.8 97.4 58.8 95.2 52.1 2.1 85.4-52.6 58.8-95.2-.1-.2-.2-.3-.3-.4-39.4-97.9 193.8-95.5 146.5 8.2-4.6 10-6.7 21.3-5.7 33 4.9 53.4 68.7 74.1 104.9 35.2 17.8-14.8 23.1-65.6 0-88.3zm-303.9-19.1h-.6c-43.4 0-62.8-37.5-62.8-62.8 0-34.7 28.2-62.8 62.8-62.8h.6c34.7 0 62.8 28.1 62.8 62.8 0 25-19.2 62.8-62.8 62.8z"></path>
                </svg>
                Mendeley
              </div>
            }
          />
          <Textfield
            defaultValue={profileData?.socialMedia?.academia}
            onChange={(e) => {
              setEditData((prev) => ({
                ...prev,
                academia: e.target.value
              }));
            }}
            label={
              <div className="flex items-center gap-x-1 [&_svg]:size-3 [&_svg]:rounded-full [&_svg]:bg-black [&_svg]:fill-white [&_svg]:p-0.5">
                <svg
                  strokeWidth="0"
                  role="img"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.033 21.18L13.77.459H7.869l1.049 2.623L1.836 21.18C1.574 22.098.787 22.23 0 22.361v1.18h6.82v-1.18C4.984 22.23 3.934 21.967 4.721 20c.131-.131.656-1.574 1.311-3.41h8.393l1.18 3.016c.131.525.262.918.262 1.311 0 1.049-.918 1.443-2.623 1.443v1.18H24v-1.18c-.918-.13-1.705-.393-1.967-1.18zM6.82 14.361a363.303 363.303 0 0 0 3.279-8.525l3.41 8.525H6.82z"></path>
                </svg>
                Academia
              </div>
            }
          />
        </div>
        <hr className="my-5" />
        <h2 className="mb-6">شبکه‌های اجتماعی عمومی</h2>
        <div
          className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2"
          dir="ltr"
        >
          <Textfield
            defaultValue={profileData?.socialMedia?.eitaa}
            onChange={(e) => {
              setEditData((prev) => ({
                ...prev,
                eitaa: e.target.value
              }));
            }}
            label={
              <div className="flex items-center gap-x-1 [&_img]:size-4">
                <img src="/images/eitta.png" alt="" />
                Eitaa
              </div>
            }
          />
          <Textfield
            defaultValue={profileData?.socialMedia?.faceBook}
            onChange={(e) => {
              setEditData((prev) => ({
                ...prev,
                facebook: e.target.value
              }));
            }}
            label={
              <div className="flex items-center gap-x-1 [&_svg]:size-4">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="#1877f2" height="512" rx="15%" width="512" />
                  <path
                    d="m355.6 330 11.4-74h-71v-48c0-20.2 9.9-40 41.7-40h32.3v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6v56.4h-65v74h65v182h80v-182z"
                    fill="#fff"
                  />
                </svg>
                FaceBook
              </div>
            }
          />
          <Textfield
            defaultValue={profileData?.socialMedia?.instagram}
            onChange={(e) => {
              setEditData((prev) => ({
                ...prev,
                instagram: e.target.value
              }));
            }}
            label={
              <div className="flex items-center gap-x-1 [&_svg]:size-4">
                <svg
                  enableBackground="new 0 0 1024 1024"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="512" cy="512" fill="#e4405f" r="512" />
                  <path
                    d="m512 256c-69.5 0-78.2.3-105.5 1.5-27.3 1.3-45.8 5.6-62.1 11.9-16.8 6.5-31.1 15.3-45.4 29.5s-23 28.5-29.5 45.4c-6.3 16.3-10.6 34.9-11.9 62.1-1.3 27.3-1.5 36-1.5 105.5s.3 78.2 1.5 105.5c1.3 27.2 5.6 45.8 11.9 62.1 6.5 16.8 15.3 31.1 29.5 45.4 14.2 14.2 28.5 23 45.4 29.5 16.3 6.3 34.9 10.6 62.1 11.9 27.3 1.3 36 1.5 105.5 1.5s78.2-.3 105.5-1.5c27.2-1.3 45.8-5.6 62.1-11.9 16.8-6.5 31.1-15.3 45.4-29.5 14.2-14.2 23-28.5 29.5-45.4 6.3-16.3 10.6-34.9 11.9-62.1 1.3-27.3 1.5-36 1.5-105.5s-.3-78.2-1.5-105.5c-1.3-27.2-5.6-45.8-11.9-62.1-6.5-16.8-15.3-31.1-29.5-45.4-14.2-14.2-28.5-23-45.4-29.5-16.3-6.3-34.9-10.6-62.1-11.9-27.3-1.2-36-1.5-105.5-1.5zm0 46.1c68.3 0 76.5.3 103.5 1.5 25 1.2 38.5 5.3 47.5 8.9 12 4.6 20.5 10.2 29.5 19.1 8.9 9 14.5 17.5 19.1 29.5 3.5 9 7.7 22.5 8.8 47.5 1.2 27 1.5 35.1 1.5 103.5s-.3 76.5-1.6 103.5c-1.3 25-5.5 38.5-9 47.5-4.8 12-10.2 20.5-19.2 29.5-8.9 8.9-17.6 14.5-29.4 19.1-9 3.5-22.7 7.7-47.7 8.8-27.2 1.2-35.2 1.5-103.7 1.5s-76.5-.3-103.7-1.6c-25-1.3-38.7-5.5-47.7-9-12.1-4.8-20.5-10.2-29.4-19.2-9-8.9-14.7-17.6-19.2-29.4-3.5-9-7.7-22.7-9-47.7-1-26.9-1.3-35.2-1.3-103.3 0-68.2.3-76.5 1.3-103.7 1.3-25 5.4-38.7 9-47.7 4.5-12.2 10.2-20.5 19.2-29.5 8.9-8.9 17.3-14.7 29.4-19.2 9-3.5 22.4-7.7 47.4-9 27.2-1 35.2-1.3 103.7-1.3zm0 78.4c-72.6 0-131.5 58.9-131.5 131.5s58.9 131.5 131.5 131.5 131.5-58.9 131.5-131.5-58.9-131.5-131.5-131.5zm0 216.8c-47.1 0-85.3-38.2-85.3-85.3s38.2-85.3 85.3-85.3 85.3 38.2 85.3 85.3-38.2 85.3-85.3 85.3zm167.4-221.9c0 17-13.8 30.7-30.7 30.7-17 0-30.7-13.8-30.7-30.7s13.8-30.7 30.7-30.7c16.9-.1 30.7 13.7 30.7 30.7z"
                    fill="#fff"
                  />
                </svg>
                Instagram
              </div>
            }
          />
          <Textfield
            defaultValue={profileData?.socialMedia?.twitter}
            onChange={(e) => {
              setEditData((prev) => ({
                ...prev,
                twitter: e.target.value
              }));
            }}
            label={
              <div className="flex items-center gap-x-1 [&_svg]:size-4">
                <svg
                  enableBackground="new 0 0 1024 1024"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="512" cy="512" fill="#1da1f2" r="512" />
                  <path
                    d="m778 354.8c-18.8 8.3-38.9 13.9-60.1 16.5 21.6-13 38.2-33.5 46-57.9-20.2 11.8-42.7 20.4-66.5 25.2-19.1-20.4-46.2-33.2-76.4-33.2-57.8 0-104.7 46.9-104.7 104.6 0 8.3 1 16.3 2.7 23.9-87-4.1-164.2-45.9-215.8-109.1-9.1 15.4-14.2 33.2-14.2 52.7 0 36.4 18.5 68.4 46.6 87.2-17.2-.6-33.3-5.3-47.4-13.1v1.3c0 50.8 36 93.1 84 102.7-8.8 2.4-18.1 3.6-27.6 3.6-6.7 0-13.1-.6-19.5-1.8 13.4 41.6 52 71.9 98 72.7-35.7 28.1-81.1 44.8-129.8 44.8-8.3 0-16.6-.5-24.9-1.4 46.6 29.7 101.5 47 160.8 47 192.5 0 297.8-159.5 297.8-297.6 0-4.4 0-8.9-.3-13.4 20.4-14.7 38.3-33.2 52.3-54.2z"
                    fill="#fff"
                  />
                </svg>
                Twitter
              </div>
            }
          />
        </div>
        <hr className="my-5" />
        <h2 className="mb-6">وبسایت‌ها</h2>
        <WebLinkTextfieldRepeater
          defaultValues={profileData?.webLinks}
          onValuesChange={(values) => {
            setEditData((prev) => ({
              ...prev,
              webLinks: values
            }));
          }}
        />
      </div>
      <SaveButton />
    </form>
  );
};
export default EditProfileSocialLinks;
