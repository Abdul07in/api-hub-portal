import { type FC } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { type UseFormSetValue } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { PROFILE_CONTENT } from "../serviceconstant";
import type { ProfileUpdateRequest } from "@/portal/services/profile";

interface NotificationSettingsProps {
  emailAlerts: boolean;
  apiStatusUpdates: boolean;
  marketingComms: boolean;
  setValue: UseFormSetValue<ProfileUpdateRequest>;
}

const NotificationSettings: FC<NotificationSettingsProps> = ({
  emailAlerts,
  apiStatusUpdates,
  marketingComms,
  setValue,
}) => {
  return (
    <Card className="profile-template__card">
      <CardContent sx={{ p: 4 }}>
        <Box className="profile-template__card-header">
          <Box className="profile-template__icon-box profile-template__icon-box--notifications">
            <NotificationsActiveIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="h6" className="profile-template__card-title">
              {PROFILE_CONTENT.notifications.title}
            </Typography>
            <Typography variant="body2" className="profile-template__card-desc">
              {PROFILE_CONTENT.notifications.description}
            </Typography>
          </Box>
        </Box>

        <Box className="profile-template__notification-row">
          <Box>
            <span className="profile-template__notification-label">
              {PROFILE_CONTENT.notifications.emailAlerts.label}
            </span>
            <Typography className="profile-template__notification-desc">
              {PROFILE_CONTENT.notifications.emailAlerts.description}
            </Typography>
          </Box>
          <Switch
            checked={emailAlerts}
            onCheckedChange={(val) => setValue("emailAlerts", val, { shouldDirty: true })}
          />
        </Box>

        <Box className="profile-template__notification-row">
          <Box>
            <span className="profile-template__notification-label">
              {PROFILE_CONTENT.notifications.apiStatus.label}
            </span>
            <Typography className="profile-template__notification-desc">
              {PROFILE_CONTENT.notifications.apiStatus.description}
            </Typography>
          </Box>
          <Switch
            checked={apiStatusUpdates}
            onCheckedChange={(val) => setValue("apiStatusUpdates", val, { shouldDirty: true })}
          />
        </Box>

        <Box className="profile-template__notification-row">
          <Box>
            <span className="profile-template__notification-label">
              {PROFILE_CONTENT.notifications.marketing.label}
            </span>
            <Typography className="profile-template__notification-desc">
              {PROFILE_CONTENT.notifications.marketing.description}
            </Typography>
          </Box>
          <Switch
            checked={marketingComms}
            onCheckedChange={(val) => setValue("marketingComms", val, { shouldDirty: true })}
          />
        </Box>

        <Box className="profile-template__footer-note">
          {PROFILE_CONTENT.notifications.footerNote}
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
