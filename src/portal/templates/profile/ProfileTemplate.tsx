import { type FC } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import {
  type UseFormRegister,
  type UseFormWatch,
  type UseFormSetValue,
  type UseFormHandleSubmit,
  type FieldErrors,
} from "react-hook-form";
import { PROFILE_CONTENT } from "./serviceconstant";
import type { ProfileUpdateRequest } from "@/portal/services/profile";
import ProfileInformation from "./components/ProfileInformation";
import SecuritySettings from "./components/SecuritySettings";
import AccountOverview from "./components/AccountOverview";
import NotificationSettings from "./components/NotificationSettings";
import StatusBanner from "@/common/atoms/statusBanner/StatusBanner";
import ConfirmModal from "@/common/atoms/confirmModal/ConfirmModal";
import "./ProfileTemplate.scss";

export type SaveStatus = "success" | "error" | null;

interface ProfileTemplateProps {
  loading: boolean;
  saving: boolean;
  isDirty: boolean;
  partnerCode: string;
  joinDate: string;
  status: string;
  saveStatus: SaveStatus;
  saveMessage: string;
  errors: FieldErrors<ProfileUpdateRequest>;
  register: UseFormRegister<ProfileUpdateRequest>;
  watch: UseFormWatch<ProfileUpdateRequest>;
  setValue: UseFormSetValue<ProfileUpdateRequest>;
  handleSubmit: UseFormHandleSubmit<ProfileUpdateRequest>;
  onSubmit: (data: ProfileUpdateRequest) => void;
  onDiscard: () => void;
  onDismissStatus: () => void;
  isConfirmModalOpen: boolean;
  onConfirmSave: () => void;
  onCancelSave: () => void;
}

const ProfileTemplate: FC<ProfileTemplateProps> = ({
  loading,
  saving,
  isDirty,
  partnerCode,
  joinDate,
  status,
  saveStatus,
  saveMessage,
  errors,
  register,
  watch,
  setValue,
  handleSubmit,
  onSubmit,
  onDiscard,
  onDismissStatus,
  isConfirmModalOpen,
  onConfirmSave,
  onCancelSave,
}: ProfileTemplateProps) => {
  if (loading) {
    return (
      <Box className="profile-template__loading">
        <CircularProgress />
      </Box>
    );
  }

  const emailAlerts = watch("emailAlerts");
  const apiStatusUpdates = watch("apiStatusUpdates");
  const marketingComms = watch("marketingComms");

  return (
    <Box className="profile-template">
      <Box className="profile-template__header">
        <Box>
          <Typography variant="h4" className="profile-template__hero-title">
            {PROFILE_CONTENT.hero.title}
          </Typography>
          <Typography variant="body1" className="profile-template__hero-desc">
            {PROFILE_CONTENT.hero.description}
          </Typography>
        </Box>
        <Box className="profile-template__actions">
          <Button
            variant="outlined"
            onClick={onDiscard}
            disabled={!isDirty || saving}
            className="profile-template__discard-btn"
          >
            {PROFILE_CONTENT.hero.discardBtn}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty || saving}
            className="profile-template__save-btn"
          >
            {PROFILE_CONTENT.hero.saveBtn}
          </Button>
        </Box>
      </Box>

      {saveStatus && (
        <StatusBanner
          type={saveStatus}
          message={saveMessage}
          visible={!!saveStatus}
          onDismiss={onDismissStatus}
        />
      )}

      <Box className="profile-template__grid">
        <ProfileInformation register={register} watch={watch} errors={errors} />
        <AccountOverview partnerCode={partnerCode} joinDate={joinDate} status={status} />
        <SecuritySettings />
        <NotificationSettings
          emailAlerts={emailAlerts}
          apiStatusUpdates={apiStatusUpdates}
          marketingComms={marketingComms}
          setValue={setValue}
        />
      </Box>

      {/* Support Banner */}
      <Box className="profile-template__support-banner">
        <Box className="profile-template__support-content">
          <Box className="profile-template__support-icon-wrapper">
            <span className="profile-template__support-icon">🎧</span>
          </Box>
          <Box>
            <Typography className="profile-template__support-title">
              {PROFILE_CONTENT.supportBanner.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {PROFILE_CONTENT.supportBanner.description}
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" className="profile-template__support-btn">
          {PROFILE_CONTENT.supportBanner.contactBtn}
        </Button>
      </Box>

      <ConfirmModal
        open={isConfirmModalOpen}
        title="Confirm Update"
        message="Do you want to update your profile?"
        onConfirm={onConfirmSave}
        onCancel={onCancelSave}
        loading={saving}
      />
    </Box>
  );
};

export default ProfileTemplate;
