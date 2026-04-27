import { useEffect, useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { fetchProfile, updateProfile, type ProfileUpdateRequest } from "@/portal/services/profile";
import ProfileTemplate, { type SaveStatus } from "@/portal/templates/profile/ProfileTemplate";

const STATUS_BANNER_DURATION_MS = 5000;

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [partnerCode, setPartnerCode] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [status, setStatus] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<ProfileUpdateRequest | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isDirty, errors },
  } = useForm<ProfileUpdateRequest>({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      emailAlerts: true,
      apiStatusUpdates: true,
      marketingComms: false,
    },
  });

  const showStatus = useCallback((type: SaveStatus, message: string) => {
    clearTimeout(statusTimerRef.current);
    setSaveStatus(type);
    setSaveMessage(message);
    statusTimerRef.current = setTimeout(() => {
      setSaveStatus(null);
      setSaveMessage("");
    }, STATUS_BANNER_DURATION_MS);
  }, []);

  const dismissStatus = useCallback(() => {
    clearTimeout(statusTimerRef.current);
    setSaveStatus(null);
    setSaveMessage("");
  }, []);

  useEffect(() => {
    return () => clearTimeout(statusTimerRef.current);
  }, []);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProfile();
      reset({
        fullName: data.fullName || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        companyName: data.companyName || "",
        emailAlerts: data.emailAlerts ?? true,
        apiStatusUpdates: data.apiStatusUpdates ?? true,
        marketingComms: data.marketingComms ?? false,
      });
      setPartnerCode(data.partnerCode || "");
      if (data.joinDate) {
        setJoinDate(
          new Date(data.joinDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        );
      }
      setStatus(data.status || "VERIFIED PARTNER");
    } catch (error) {
      toast.error("Failed to load profile data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const onSubmit = (data: ProfileUpdateRequest) => {
    setPendingFormData(data);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSave = async () => {
    if (!pendingFormData) return;
    try {
      setSaving(true);
      await updateProfile(pendingFormData);
      reset(pendingFormData);
      showStatus("success", "Profile updated successfully!");
      toast.success("Profile updated successfully!");
      setIsConfirmModalOpen(false);
      setPendingFormData(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update profile.";
      showStatus("error", message);
      toast.error(message);
      setIsConfirmModalOpen(false);
      setPendingFormData(null);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelSave = () => {
    setIsConfirmModalOpen(false);
    setPendingFormData(null);
  };

  const handleDiscard = () => {
    dismissStatus();
    loadProfile();
  };

  return (
    <ProfileTemplate
      loading={loading}
      saving={saving}
      isDirty={isDirty}
      partnerCode={partnerCode}
      joinDate={joinDate}
      status={status}
      saveStatus={saveStatus}
      saveMessage={saveMessage}
      errors={errors}
      register={register}
      watch={watch}
      setValue={setValue}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onDiscard={handleDiscard}
      onDismissStatus={dismissStatus}
      isConfirmModalOpen={isConfirmModalOpen}
      onConfirmSave={handleConfirmSave}
      onCancelSave={handleCancelSave}
    />
  );
}
