import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Store from "../Store";
import { observer } from "mobx-react";

const ServiceContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ServiceCard = styled.div`
  position: relative;
  max-width: 20%;
  min-width: 285px;
  background-color: #fff;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.24);
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.24);
  @media (max-width: 1280px) {
    max-width: 33%;
    width: 31%;
  }
  @media (max-width: 900px) {
    max-width: 50%;
    width: 46%;
  }
  @media (max-width: 640px) {
    margin: 10px;
    min-width: 250px;
  }
  @media (max-width: 560px) {
    max-width: 350px;
    width: 100%;
  }
`;
const ServImage = styled.div`
  height: 55%;
  display: flex;
`;
const AvatarImage = styled.div`
  width: 100%;
  max-width: 40px;
`;
const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  padding-bottom: 0;
`;
const ServiceTitle = styled.p`
  margin: 0;
  padding-left: 10px;
  font-size: 1.4em;
`;
const Branches = styled.small`
  margin: 0;
  padding-left: 7.5px;
  font-size: 10px;
`;
const SmallOwnerName = styled.small`
  margin: 0;
  padding-left: 7.5px;
  font-size: 10px;
`;
const ServiceInfo = styled.div``;
const Description = styled.div`
  height: 32px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  padding: 5px 8px;
  margin-bottom: 50px;
  font-size: 12px
`;
const Avatar = styled.img`
  border-radius: 50%;
  width: 100%;
`;
const RatingAndPrice = styled.div`
  font-size: 1.3em;
  display: flex;
  justify-content: space-between;
  background-color: hsl(0, 0%, 93%);
  padding: 10px 20px;

  margin-top: 15px;
  position: absolute;
  width: 100%;
  bottom: 0px;
`;
const StrongP = styled.p`
  font-weight: 700;
  margin: 0;
`;
const ServImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ServicesList = observer(() => {
  return (
    <ServiceContainer>
      {Store.services &&
        Store.services.map((service) => (
          <Link href={`${service.slug}`} key={service.name}>
            <ServiceCard>
              <ServImage className="service_image">
                <ServImg
                  src={`http://localhost:8000${service.images[0]}`}
                  alt={`${service.images[0]}`}
                />
              </ServImage>

              <AvatarSection>
                <AvatarImage className="avatar">
                  <Avatar
                    src={checkForAvatar(service.ownerAvatar)}
                    atl="avatar"
                  />
                </AvatarImage>

                <ServiceInfo>
                  <SmallOwnerName>{service.ownerName}</SmallOwnerName>
                  <ServiceTitle>{service.name}</ServiceTitle>
                  <Branches>test branches</Branches>
                  {/* <Branches>{service.branch}</Branches> */}
                </ServiceInfo>
              </AvatarSection>
              <Description>{service.description}</Description>
              <RatingAndPrice>
                <div className="rating">
                  {calculateServiceRating(service)}
                  <small>
                    (
                    {service.comments !== undefined
                      ? service.comments.length
                      : 0}
                    )
                  </small>
                </div>
                {service.price != null ? (
                  <StrongP>{service.price.toString()}лв.</StrongP>
                ) : (
                  <StrongP>&nbsp;</StrongP>
                )}
              </RatingAndPrice>
            </ServiceCard>
          </Link>
        ))}
    </ServiceContainer>
  );
});

export default ServicesList;

function calculateServiceRating(service) {
  if (service.comments === undefined) return 0;
  if (service.comments.length === 0) return 0;
  let rating = 0;
  let comments = service.comments.length;
  console.log(comments);
  service.comments.forEach((comment) => {
    rating += comment.Rating;
  });
  return rating / comments;
}

const checkForAvatar = (image) => {
  if (image === undefined || image === null) {
    return "/defAvatarDark.png";
  } else {
    return `http://localhost:8000${image}`;
  }
};
