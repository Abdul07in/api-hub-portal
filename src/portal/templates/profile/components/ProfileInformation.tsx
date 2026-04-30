import { type FC } from "react";
import { type UseFormRegister, type UseFormWatch, type FieldErrors } from "react-hook-form";
import { Card, CardContent, Avatar, TextField, Typography, Box } from "@mui/material";
import { PROFILE_CONTENT } from "../serviceconstant";
import type { ProfileUpdateRequest } from "@/portal/services/profile";

interface ProfileInformationProps {
  register: UseFormRegister<ProfileUpdateRequest>;
  watch: UseFormWatch<ProfileUpdateRequest>;
  errors: FieldErrors<ProfileUpdateRequest>;
}

const ProfileInformation: FC<ProfileInformationProps> = ({ register, watch, errors }) => {
  return (
    <Card className="profile-template__card">
      <CardContent sx={{ p: 4 }}>
        <Box className="profile-template__card-header">
          <Avatar className="profile-template__avatar">
            {watch("fullName")?.charAt(0) || "U"}
          </Avatar>
          <Box>
            <Typography variant="h6" className="profile-template__card-title">
              {PROFILE_CONTENT.profileInformation.title}
            </Typography>
            <Typography variant="body2" className="profile-template__card-desc">
              {PROFILE_CONTENT.profileInformation.description}
            </Typography>
          </Box>
        </Box>

        <Box className="profile-template__fields-grid">
          <Box>
            <Typography variant="caption" className="profile-template__field-label">
              {PROFILE_CONTENT.profileInformation.fields.fullName}
            </Typography>
            <TextField
              fullWidth
              size="small"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              {...register("fullName")}
            />
          </Box>
          <Box>
            <Typography variant="caption" className="profile-template__field-label">
              {PROFILE_CONTENT.profileInformation.fields.email}
            </Typography>
            <TextField
              fullWidth
              size="small"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Box>
          <Box>
            <Typography variant="caption" className="profile-template__field-label">
              {PROFILE_CONTENT.profileInformation.fields.phoneNumber}
            </Typography>
            <TextField
              fullWidth
              size="small"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              {...register("phoneNumber")}
            />
          </Box>
          <Box>
            <Typography variant="caption" className="profile-template__field-label">
              {PROFILE_CONTENT.profileInformation.fields.companyName}
            </Typography>
            <TextField
              fullWidth
              size="small"
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
              {...register("companyName")}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileInformation;
