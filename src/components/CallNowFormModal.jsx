import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { CgClose } from "react-icons/cg";
import { RiLoader2Line } from "react-icons/ri";
import {
  FiUser,
  FiPhone,
  FiMessageSquare,
  FiClock,
  FiTag,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import { getCategoryList } from "../../src/services/api/categoryApi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const DAY_OPTIONS = [
  { value: 15, label: "15 Days" },
  { value: 30, label: "30 Days" },
  { value: 60, label: "60 Days" },
];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "42px",
    borderRadius: "0.75rem",
    borderColor: state.isFocused ? "#13693a" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(19,105,58,0.25)" : "none",
    "&:hover": { borderColor: "#13693a" },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#13693a"
      : state.isFocused
        ? "#f0fdf4"
        : "white",
    color: state.isSelected ? "white" : "#111827",
    cursor: "pointer",
  }),
  placeholder: (base) => ({ ...base, color: "#9ca3af" }),
  menu: (base) => ({ ...base, borderRadius: "0.75rem", overflow: "hidden" }),
};

const FieldLabel = ({ icon: Icon, children, required }) => (
  <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
    {Icon && <Icon className="text-[#13693a]" size={14} />}
    {children}
    {required && <span className="text-red-500">*</span>}
  </label>
);

const CallNowFormModal = ({ open, onClose, product, onSubmitLead }) => {
  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.token);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { data: categoryList, isLoading: categoryLoading } = useQuery({
    queryKey: ["category-list", 1],
    queryFn: () => getCategoryList(1, token),
  });
  const [submitting, setSubmitting] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pendingPayload, setPendingPayload] = useState(null);
  const [otp, setOtp] = useState("");
  const otpInputRefs = useRef([]);
  const [otpError, setOtpError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const STATIC_OTP = "123456";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendTimer]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      buyer_name: "",
      mobile_no: "",
      interested_categories: [],
      buy_within: null,
      message: "",
    },
  });

  const handleClose = () => {
    reset();
    setOtp("");
    setOtpError("");
    setVerifying(false);
    setSendingOtp(false);
    setResendTimer(0);
    setPendingPayload(null);
    setShowOtpModal(false);
    onClose();
  };

  const sendOtp = async (mobile_no) => {
    setSendingOtp(true);
    try {
      console.log("Send OTP to:", mobile_no);
      setResendTimer(30);
      otpInputRefs.current[0]?.focus();
    } catch (err) {
      console.error("Failed to send OTP:", err);
      toast.error(t("Could not send OTP. Please try again."));
      setShowOtpModal(false);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleOtpChange = (index, e) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const otpArray = otp.split("");
    otpArray[index] = digit || "";
    const newOtp = otpArray.join("").slice(0, 6);
    setOtp(newOtp);
    if (otpError) setOtpError("");

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    setOtp(pasted);
    if (otpError) setOtpError("");
    const nextIndex = pasted.length < 6 ? pasted.length : 5;
    otpInputRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setOtpError(t("Enter a valid OTP"));
      return;
    }
    setOtpError("");
    setVerifying(true);
    try {
      const isValid = otp === STATIC_OTP;

      if (!isValid) {
        setOtpError(t("Incorrect OTP. Please try again."));
        setVerifying(false);
        return;
      }

      setSubmitting(true);
      if (onSubmitLead) {
        await onSubmitLead(pendingPayload);
      } else {
        console.log("Lead payload:", pendingPayload);
      }

      toast.success(t("Request submitted successfully!"));
      setShowOtpModal(false);
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error(t("Something went wrong. Please try again."));
    } finally {
      setVerifying(false);
      setSubmitting(false);
    }
  };

  const handleResendOtp = () => {
    if (resendTimer > 0 || !pendingPayload) return;
    sendOtp(pendingPayload.mobile_no);
  };

  const onSubmit = async (data) => {
    const payload = {
      buyer_name: data.buyer_name,
      mobile_no: data.mobile_no,
      interested_category_ids: data.interested_categories.map((c) => c.value),
      buy_within_days: data.buy_within.value,
      message: data.message || "",
      product_id: product?.id,
      category_id: product?.category_id,
    };

    setPendingPayload(payload);
    setOtp("");
    setOtpError("");
    setShowOtpModal(true);
    await sendOtp(data.mobile_no);
  };

  const categoryOptions = (categoryList || []).map((c) => ({
    value: c.category_id,
    label: c.category_name,
  }));

  return (
    <>
      {/* ------------------------ MAIN FORM ------------------------ */}
      <Dialog open={open && !showOtpModal}>
        <DialogContent className="w-full max-w-xl p-0 rounded-2xl overflow-hidden border-gray-200"
          style={{ backgroundColor: "#ffffff", opacity: 1 }}>
          {/* Header banner */}
          <div className="relative bg-linear-to-r from-[#13693a] to-[#8cbf44] px-6 md:pt-6 md:pb-8 pt-4 pb-4">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 20%, white 0, transparent 45%), radial-gradient(circle at 85% 80%, white 0, transparent 40%)",
              }}
            />
            <button
              type="button"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:scale-105 transition-all z-10"
              onClick={handleClose}
            >
              <CgClose />
            </button>

            <DialogHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                  <FiPhone className="text-white" size={18} />
                </div>
                <div>
                  <DialogTitle className="text-white text-lg font-bold">
                    {t("Request a Call")}
                  </DialogTitle>
                  <DialogDescription className="text-white/85 text-xs ">
                    {t("Fill in your details and we'll get in touch with you.")}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Form body */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 sm:py-6 py-1 grid grid-cols-1 sm:grid-cols-2 gap-x-5 sm:gap-y-5 gap-y-3 "
          >
            {/* Buyer Name */}
            <div>
              <FieldLabel icon={FiUser} required>
                {t("Buyer Name")}
              </FieldLabel>
              <input
                type="text"
                {...register("buyer_name", {
                  required: t("Buyer name is required"),
                })}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13693a]/40 focus:border-[#13693a] transition-all"
                placeholder={t("Enter your name")}
              />
              {errors.buyer_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.buyer_name.message}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <FieldLabel icon={FiPhone} required>
                {t("Mobile Number")}
              </FieldLabel>
              <input
                type="tel"
                inputMode="numeric"
                {...register("mobile_no", {
                  required: t("Mobile number is required"),
                  pattern: {
                    value: /^[1-9]\d{9}$/,
                    message: t("Enter a valid 10-digit mobile number"),
                  },
                })}
                onKeyDown={(e) => {
                  const allowedKeys = [
                    "Backspace",
                    "Delete",
                    "Tab",
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowDown",
                    "Home",
                    "End",
                  ];
                  if (allowedKeys.includes(e.key)) return;
                  if (e.ctrlKey || e.metaKey) return;
                  if (!/^[0-9]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const paste = e.clipboardData.getData("text");
                  if (/[^0-9]/.test(paste)) {
                    e.preventDefault();
                    const digitsOnly = paste.replace(/\D/g, "").slice(0, 10);
                    e.target.value = digitsOnly;
                    e.target.dispatchEvent(
                      new Event("input", { bubbles: true }),
                    );
                  }
                }}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13693a]/40 focus:border-[#13693a] transition-all"
                placeholder={t("Enter your mobile number")}
                maxLength={10}
              />
              {errors.mobile_no && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobile_no.message}
                </p>
              )}
            </div>

            {/* Interested Categories */}
            <div>
              <FieldLabel icon={FiTag} required>
                {t("Interested Categories")}
              </FieldLabel>
              <Controller
                name="interested_categories"
                control={control}
                rules={{
                  validate: (value) =>
                    (value && value.length > 0) ||
                    t("Select at least one category"),
                }}
                render={({ field: { onChange, value } }) => {
                  const selected = value || [];

                  const toggleCategory = (opt) => {
                    const exists = selected.some((s) => s.value === opt.value);
                    if (exists) {
                      onChange(selected.filter((s) => s.value !== opt.value));
                    } else {
                      onChange([...selected, opt]);
                    }
                  };

                  return (
                    <div className="relative w-full min-w-0" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((o) => !o)}
                        className={`w-full min-w-0 max-w-full border rounded-xl px-3.5 py-2.5 text-left text-sm flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#13693a]/40 transition-all overflow-hidden ${
                          dropdownOpen
                            ? "border-[#13693a] ring-2 ring-[#13693a]/40"
                            : "border-gray-300 hover:border-[#13693a]"
                        }`}
                      >
                        <span
                          className={`truncate min-w-0 flex-1 ${
                            selected.length === 0 ? "text-gray-400" : ""
                          }`}
                        >
                          {selected.length === 0
                            ? t("Select categories")
                            : `${selected.length} ${t("selected")}`}
                        </span>
                        <span
                          className={`ml-2 shrink-0 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        >
                          ▾
                        </span>
                      </button>

                      {selected.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {selected.map((s) => (
                            <span
                              key={s.value}
                              className="inline-flex items-center gap-1 bg-[#8cbf44]/10 border border-[#8cbf44]/30 text-[#13693a] text-xs font-medium px-2.5 py-1 rounded-full"
                            >
                              {s.label}
                              <button
                                type="button"
                                onClick={() => toggleCategory(s)}
                                className="hover:text-red-500 transition-colors"
                              >
                                <CgClose size={11} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {dropdownOpen && (
                        <div className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto border border-gray-200 rounded-xl bg-white shadow-xl">
                          {categoryLoading ? (
                            <div className="p-3 text-sm text-gray-400 flex items-center gap-2">
                              <RiLoader2Line className="animate-spin" />
                              {t("Loading...")}
                            </div>
                          ) : categoryOptions.length === 0 ? (
                            <div className="p-3 text-sm text-gray-400">
                              {t("No categories found")}
                            </div>
                          ) : (
                            categoryOptions.map((opt) => {
                              const checked = selected.some(
                                (s) => s.value === opt.value,
                              );
                              return (
                                <label
                                  key={opt.value}
                                  className={`flex items-center gap-2 px-3.5 py-2.5 text-sm cursor-pointer transition-colors ${
                                    checked
                                      ? "bg-[#8cbf44]/10"
                                      : "hover:bg-gray-50"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleCategory(opt)}
                                    className="accent-[#13693a] w-4 h-4"
                                  />
                                  <span
                                    className={
                                      checked
                                        ? "text-[#13693a] font-medium"
                                        : "text-gray-700"
                                    }
                                  >
                                    {opt.label}
                                  </span>
                                  {checked && (
                                    <FiCheckCircle
                                      className="text-[#13693a] ml-auto"
                                      size={14}
                                    />
                                  )}
                                </label>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              {errors.interested_categories && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.interested_categories.message}
                </p>
              )}
            </div>

            {/* Buy Within */}
            <div>
              <FieldLabel icon={FiClock} required>
                {t("Want to Buy Within")}
              </FieldLabel>
              <Controller
                name="buy_within"
                control={control}
                rules={{ required: t("Please select a timeframe") }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={DAY_OPTIONS}
                    placeholder={t("Select duration")}
                    styles={selectStyles}
                    className="text-sm"
                  />
                )}
              />
              {errors.buy_within && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.buy_within.message}
                </p>
              )}
            </div>

            {/* Message (optional) — full width */}
            <div className="sm:col-span-2">
              <FieldLabel icon={FiMessageSquare}>
                {t("Message")}{" "}
                <span className="text-gray-400 text-xs font-normal">
                  ({t("optional")})
                </span>
              </FieldLabel>
              <textarea
                {...register("message")}
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13693a]/40 focus:border-[#13693a] transition-all resize-none"
                placeholder={t("Type your message here...")}
              />
            </div>

            {/* Submit — full width */}
            <div className="sm:col-span-2 ">
              <button
                type="submit"
                disabled={sendingOtp}
                className="btn-shimmer bg-linear-to-r from-[#13693a] to-[#8cbf44] text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 w-full flex items-center justify-center gap-2"
              >
                {sendingOtp ? (
                  <>
                    <RiLoader2Line className="animate-spin" size={16} />
                    {t("Sending OTP...")}
                  </>
                ) : (
                  <>
                    <FiPhone size={15} />
                    {t("Submit")}
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-gray-400 sm:mt-2.5 mt-1.5">
                {t("We'll send a one-time code to verify your number.")}
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ------------------------ OTP MODAL ------------------------ */}
      <Dialog open={open && showOtpModal}>
        <DialogContent className="w-full max-w-sm p-0 rounded-2xl overflow-hidden border-gray-200"
          style={{ backgroundColor: "#ffffff", opacity: 1 }}>
          <div className="relative bg-linear-to-r from-[#13693a] to-[#8cbf44] px-6 pt-6 pb-8 text-center">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, white 0, transparent 45%), radial-gradient(circle at 80% 70%, white 0, transparent 40%)",
              }}
            />
            <button
              type="button"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:scale-105 transition-all z-10"
              onClick={handleClose}
            >
              <CgClose />
            </button>

            <div className="relative flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                <FiShield className="text-white" size={22} />
              </div>
              <DialogHeader>
                <DialogTitle className="text-white text-lg font-bold">
                  {t("Verify Mobile Number")}
                </DialogTitle>
                <DialogDescription className="text-white/85 text-xs mt-1">
                  {t("Enter the OTP sent to")}{" "}
                  <span className="font-semibold text-white">
                    {pendingPayload?.mobile_no}
                  </span>
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="flex justify-between gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(index, e)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={handleOtpPaste}
                  autoFocus={index === 0}
                  className={`w-11 h-12 border rounded-xl text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#13693a]/40 transition-all ${
                    otpError
                      ? "border-red-400"
                      : otp[index]
                        ? "border-[#13693a] text-[#13693a]"
                        : "border-gray-300"
                  }`}
                />
              ))}
            </div>
            {otpError && (
              <p className="text-red-500 text-xs mt-2 text-center">
                {otpError}
              </p>
            )}

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={verifying || submitting}
              className="btn-shimmer bg-linear-to-r from-[#13693a] to-[#8cbf44] text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 w-full mt-5 flex items-center justify-center gap-2"
            >
              {verifying || submitting ? (
                <>
                  <RiLoader2Line className="animate-spin" size={16} />
                  {t("Verifying...")}
                </>
              ) : (
                <>
                  <FiCheckCircle size={15} />
                  {t("Verify & Submit")}
                </>
              )}
            </button>

            <div className="text-center text-sm text-gray-500 mt-4">
              {resendTimer > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-gray-400">
                  <FiClock size={13} />
                  {t("Resend OTP in")} {resendTimer}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={sendingOtp}
                  className="text-[#13693a] font-semibold hover:underline disabled:opacity-50 transition-all"
                >
                  {sendingOtp ? t("Sending...") : t("Resend OTP")}
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CallNowFormModal;