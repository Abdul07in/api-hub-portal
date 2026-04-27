import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { PROFILE_CONTENT } from "../serviceconstant";

export default function SecuritySettings() {
  return (
    <Card className="profile-template__card">
      <CardContent sx={{ p: 4 }}>
        <Box className="profile-template__card-header">
          <Box className="profile-template__icon-box profile-template__icon-box--security">
            <LockIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="h6" className="profile-template__card-title">
              {PROFILE_CONTENT.securitySettings.title}
            </Typography>
            <Typography variant="body2" className="profile-template__card-desc">
              {PROFILE_CONTENT.securitySettings.description}
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" className="profile-template__save-btn">
          {PROFILE_CONTENT.securitySettings.changePasswordBtn}
        </Button>
      </CardContent>
    </Card>
  );
}
