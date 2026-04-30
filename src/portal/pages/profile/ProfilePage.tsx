import { useEffect, useState, useCallback, useRef, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ProfileService, { type ProfileUpdateRequest } from "@/portal/services/profile";
import ProfileTemplate, { type SaveStatus } from "@/portal/templates/profile/ProfileTemplate";
import { profileSchema } from "@/portal/templates/profile/profileValidation";

const STATUS_BANNER_DURATION_MS = 5000;

const ProfilePage: FC = () => {
  const queryClient = useQueryClient();
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
    resolver: zodResolver(profileSchema),
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

  const { data: profileData, isLoading: loading, error: profileError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => ProfileService.fetchProfile(),
  });

  useEffect(() => {
    if (profileData) {
      reset({
        fullName: profileData.fullName || "",
        email: profileData.email || "",
        phoneNumber: profileData.phoneNumber || "",
        companyName: profileData.companyName || "",
        emailAlerts: profileData.emailAlerts ?? true,
        apiStatusUpdates: profileData.apiStatusUpdates ?? true,
        marketingComms: profileData.marketingComms ?? false,
      });
      setPartnerCode(profileData.partnerCode || "");
      if (profileData.joinDate) {
        setJoinDate(
          new Date(profileData.joinDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        );
      }
      setStatus(profileData.status || "VERIFIED PARTNER");
    }
  }, [profileData, reset]);

  useEffect(() => {
    if (profileError) {
      toast.error("Failed to load profile data.");
    }
  }, [profileError]);

  const updateMutation = useMutation({
    mutationFn: (data: ProfileUpdateRequest) => ProfileService.updateProfile(data),
    onSuccess: (_, variables) => {
      reset(variables);
      showStatus("success", "Profile updated successfully!");
      toast.success("Profile updated successfully!");
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsConfirmModalOpen(false);
      setPendingFormData(null);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to update profile.";
      showStatus("error", message);
      toast.error(message);
      setIsConfirmModalOpen(false);
      setPendingFormData(null);
    },
  });

  const onSubmit = (data: ProfileUpdateRequest) => {
    setPendingFormData(data);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSave = () => {
    if (!pendingFormData) return;
    updateMutation.mutate(pendingFormData);
  };

  const handleCancelSave = () => {
    setIsConfirmModalOpen(false);
    setPendingFormData(null);
  };

  const handleDiscard = () => {
    dismissStatus();
    void queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  return (
    <ProfileTemplate
      loading={loading}
      saving={updateMutation.isPending}
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
};

export default ProfilePage;
