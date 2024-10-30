import styled from "@emotion/styled";
import { TextField, Button, Select } from "@mui/material";
import { keyframes } from "@emotion/react";


const rainAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 200% 200%; }
`;


const snowAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 150% 150%; }
`;


const thunderstormAnimation = keyframes`
  0%, 100% { background-color: #9e9e9e; }
  50% { background-color: #616161; }
`;


const cloudyAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 100% 200%; }
`;


const foggyAnimation = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`;


const drizzleAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 200% 100%; }
`;

export const WeatherContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 15px;
  background: ${(props) =>
    props.background === "rainy"
      ? "#a3c2c2"
      : props.background === "snowy"
      ? "#f0f0f0"
      : props.background === "sunny"
      ? "#ffe680"
      : props.background === "cloudy"
      ? "#d3d3d3"
      : props.background === "foggy"
      ? "#e0e0e0"
      : props.background === "thunderstorm"
      ? "#9e9e9e"
      : props.background === "drizzle"
      ? "#cce7e8"
      : "#ffffff"};
  text-align: center;
  box-shadow: ${(props) =>
    props.background !== "default" ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "none"};
`;

export const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  & img {
    width: 100px;
    height: 100px;
  }
`;

export const WeatherIcon = styled.img`
  margin-top: 1rem;
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) =>
    props.background === "rainy"
      ? "linear-gradient(to bottom, #cce7e8, #a3c2c2)"
      : props.background === "snowy"
      ? "linear-gradient(to bottom, #e6f7ff, #f0f0f0)"
      : props.background === "sunny"
      ? "linear-gradient(to bottom, #fff4cc, #ffe680)"
      : props.background === "cloudy"
      ? "linear-gradient(to bottom, #d3d3d3, #b0b0b0)"
      : props.background === "foggy"
      ? "linear-gradient(to bottom, #e0e0e0, #bdbdbd)"
      : props.background === "thunderstorm"
      ? "linear-gradient(to bottom, #9e9e9e, #616161)"
      : props.background === "drizzle"
      ? "linear-gradient(to bottom, #cce7e8, #b3d1d1)"
      : "#ffffff"};
  transition: background 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 15px;
  ${(props) =>
    props.background === "rainy" &&
    `
      animation: ${rainAnimation} 15s linear infinite;
      background-size: 600% 600%;
    `}
  ${(props) =>
    props.background === "snowy" &&
    `
      animation: ${snowAnimation} 20s linear infinite;
      background-size: 300% 300%;
    `}
  ${(props) =>
    props.background === "thunderstorm" &&
    `
      animation: ${thunderstormAnimation} 2s ease-in-out infinite;
    `}
  ${(props) =>
    props.background === "cloudy" &&
    `
      animation: ${cloudyAnimation} 25s linear infinite;
      background-size: 400% 400%;
    `}
  ${(props) =>
    props.background === "foggy" &&
    `
      animation: ${foggyAnimation} 10s ease-in-out infinite;
    `}
  ${(props) =>
    props.background === "drizzle" &&
    `
      animation: ${drizzleAnimation} 18s linear infinite;
      background-size: 500% 500%;
    `}
`;

export const StyledTextField = styled(TextField)`
  border-radius: 15px;
`;

export const StyledButton = styled(Button)`
  border-radius: 15px;
`;

export const StyledSelect = styled(Select)`
  border-radius: 15px;
`;