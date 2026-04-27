import { Card, CardContent, Typography, Box, Divider, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { PROFILE_CONTENT } from "../serviceconstant";

interface Props {
  partnerCode: string;
  joinDate: string;
  status: string;
}

export default function AccountOverview({ partnerCode, joinDate, status }: Props) {
  return (
    <Card className="profile-template__card profile-template__card--dark">
      <CardContent sx={{ p: 3, pb: 2 }}>
        <Box className="profile-template__card-header">
          <InfoIcon sx={{ mr: 1, fontSize: 20 }} />
          <Typography
            variant="h6"
            className="profile-template__card-title profile-template__card-title--dark"
          >
            {PROFILE_CONTENT.accountOverview.title}
          </Typography>
        </Box>

        <Box className="profile-template__overview-item">
          <Typography variant="caption" className="profile-template__overview-label">
            {PROFILE_CONTENT.accountOverview.partnerCode}
          </Typography>
          <Typography
            variant="h4"
            className="profile-template__overview-value profile-template__overview-value--large"
          >
            {partnerCode || "---"}
          </Typography>
        </Box>

        <Box className="profile-template__overview-item">
          <Typography variant="caption" className="profile-template__overview-label">
            {PROFILE_CONTENT.accountOverview.joinDate}
          </Typography>
          <Typography variant="body1" className="profile-template__overview-value">
            {joinDate || "---"}
          </Typography>
        </Box>

        <Box className="profile-template__overview-item">
          <Typography variant="caption" className="profile-template__overview-label">
            {PROFILE_CONTENT.accountOverview.status}
          </Typography>
          <Box>
            <span className="profile-template__status-badge">{status}</span>
          </Box>
        </Box>

        <Divider className="profile-template__divider" />

        <Button
          fullWidth
          variant="text"
          className="profile-template__download-btn"
          startIcon={<FileDownloadOutlinedIcon />}
        >
          {PROFILE_CONTENT.accountOverview.downloadKeyBtn}
        </Button>
      </CardContent>
    </Card>
  );
}
