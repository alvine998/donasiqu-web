import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Layout from "@/components/Layout";

type FormData = {
  title: string;
  category: string;
  target: number;
  deadline: string;
  description: string;
  image: FileList;
  bankName: string;
  accountNumber: string;
  accountName: string;
};

const categories = [
  "Kemanusiaan",
  "Pendidikan",
  "Kesehatan",
  "Bencana Alam",
  "Infak & Sedekah",
  "Lainnya",
];

const bankList = [
  "Bank Mandiri",
  "Bank BCA",
  "Bank BNI",
  "Bank BRI",
  "Bank Syariah Indonesia (BSI)",
  "Bank CIMB Niaga",
  "Bank Danamon",
  "Bank Lainnya",
];

const GalangDanaBaru = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>();
  const watchImage = watch("image");

  // Format number with thousand separators
  const formatNumber = (value: string) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Parse formatted number back to number
  const parseNumber = (value: string) => {
    return parseInt(value.replace(/\./g, "")) || 0;
  };

  // Handle image preview
  React.useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [watchImage]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      // Parse the formatted target amount back to number
      const targetAmount =
        typeof data.target === "string"
          ? parseNumber(data.target)
          : data.target;

      // In a real app, you would upload the image and create the campaign via API
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("target", targetAmount.toString());
      formData.append("deadline", data.deadline);
      formData.append("description", data.description);
      formData.append("bankName", data.bankName);
      formData.append("accountNumber", data.accountNumber);
      formData.append("accountName", data.accountName);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", data);
      toast.success("Campaign berhasil dibuat!");
      router.push("/galang-dana/sukses");
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Buat Galang Dana Baru - Donasiqu">
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Buat Galang Dana Baru
            </h1>
            <p className="mt-2 text-gray-600">
              Isi formulir di bawah ini untuk memulai penggalangan dana Anda
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Campaign Info Section */}
            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Informasi Campaign
              </h2>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Judul Campaign <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register("title", {
                      required: "Judul campaign harus diisi",
                    })}
                    className={`block w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:text-sm transition-colors ${
                      errors.title
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300"
                    }`}
                    placeholder="Contoh: Bantu Pendidikan Anak Yatim Piatu"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Kategori <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      {...register("category", {
                        required: "Pilih kategori campaign",
                      })}
                      className={`block w-full rounded-lg border px-4 py-3 text-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:text-sm transition-colors ${
                        errors.category
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-300"
                      }`}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pilih Kategori
                      </option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="target"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Target Donasi (Rp) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">Rp</span>
                      </div>
                      <input
                        type="text"
                        id="target"
                        value={
                          watch("target")
                            ? formatNumber(watch("target").toString())
                            : ""
                        }
                        {...register("target", {
                          required: "Target donasi harus diisi",
                          validate: {
                            min: (value) => {
                              const numValue =
                                typeof value === "string"
                                  ? parseNumber(value)
                                  : value;
                              return (
                                numValue >= 100000 ||
                                "Minimal target Rp 100.000"
                              );
                            },
                          },
                          onChange: (e) => {
                            const value = e.target.value;
                            // Remove all non-digit characters
                            const numericValue = value.replace(/\D/g, "");
                            // Format the number with thousand separators
                            const formatted =
                              numericValue === ""
                                ? ""
                                : parseInt(numericValue, 10).toLocaleString(
                                    "id-ID"
                                  );
                            // Update the display value with formatted string
                            e.target.value = formatted;
                            // Update form value with parsed number
                            setValue(
                              "target",
                              numericValue ? parseInt(numericValue, 10) : 0,
                              { shouldValidate: true }
                            );
                          },
                        })}
                        className={`block w-full pl-10 pr-4 py-3 rounded-lg border text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:text-sm transition-colors ${
                          errors.target
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-300"
                        }`}
                        placeholder="0"
                        inputMode="numeric"
                      />
                    </div>
                    {errors.target && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.target.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Batas Waktu Penggalangan Dana{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    {...register("deadline", {
                      required: "Batas waktu harus diisi",
                      validate: {
                        futureDate: (value) => {
                          const selectedDate = new Date(value);
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          return (
                            selectedDate >= tomorrow ||
                            "Pilih tanggal yang akan datang"
                          );
                        },
                      },
                    })}
                    min={new Date().toISOString().split("T")[0]}
                    className={`block w-full rounded-lg border px-4 py-3 text-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:text-sm transition-colors ${
                      errors.deadline
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.deadline && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.deadline.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Deskripsi Campaign <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    {...register("description", {
                      required: "Deskripsi campaign harus diisi",
                      minLength: {
                        value: 100,
                        message: "Minimal 100 karakter",
                      },
                    })}
                    className={`block w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:text-sm transition-colors ${
                      errors.description
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300"
                    }`}
                    placeholder="Ceritakan secara detail tentang campaign Anda, termasuk tujuan, latar belakang, dan rencana penggunaan dana."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Minimal 100 karakter
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar Utama <span className="text-red-500">*</span>
                  </label>
                  <div
                    className="mt-1 flex items-center
                  "
                  >
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-white py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:ring-offset-1 transition-colors"
                    >
                      Pilih Gambar
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        {...register("image", {
                          required: "Gambar utama harus diunggah",
                          validate: {
                            fileSize: (files) =>
                              !files[0] ||
                              files[0].size <= 5 * 1024 * 1024 ||
                              "Ukuran file maksimal 5MB",
                            fileType: (files) =>
                              !files[0] ||
                              files[0].type.startsWith("image/") ||
                              "Hanya file gambar yang diperbolehkan",
                          },
                        })}
                      />
                    </label>
                    <p className="ml-4 text-sm text-gray-500 truncate max-w-xs">
                      {watchImage && watchImage[0]
                        ? watchImage[0].name
                        : "Belum ada file yang dipilih"}
                    </p>
                  </div>
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.image.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Format: JPG, PNG (maks. 5MB)
                  </p>

                  {previewImage && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Pratinjau Gambar:
                      </p>
                      <div className="w-full max-w-md h-auto rounded-md overflow-hidden">
                        <img
                          src={previewImage}
                          alt="Pratinjau gambar campaign"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bank Account Section */}
            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Informasi Rekening Penerima
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Pastikan data rekening yang Anda masukkan sudah benar. Dana yang
                terkumpul akan ditransfer ke rekening ini.
              </p>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="bankName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama Bank <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="bankName"
                    {...register("bankName", { required: "Pilih nama bank" })}
                    className={`block w-full rounded-lg border px-4 py-3 text-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:text-sm transition-colors ${
                      errors.bankName
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300"
                    }`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih Bank
                    </option>
                    {bankList.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                  {errors.bankName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.bankName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="accountNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nomor Rekening <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      {...register("accountNumber", {
                        required: "Nomor rekening harus diisi",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Hanya angka yang diperbolehkan",
                        },
                        minLength: {
                          value: 10,
                          message: "Minimal 10 digit",
                        },
                      })}
                      className={`block w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:text-sm transition-colors ${
                        errors.accountNumber
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-300"
                      }`}
                      placeholder="Contoh: 1234567890"
                    />
                    {errors.accountNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.accountNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="accountName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nama Pemilik Rekening{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="accountName"
                      {...register("accountName", {
                        required: "Nama pemilik rekening harus diisi",
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: "Hanya huruf dan spasi yang diperbolehkan",
                        },
                      })}
                      className={`block w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:text-sm transition-colors ${
                        errors.accountName
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-300"
                      }`}
                      placeholder="Nama sesuai rekening"
                    />
                    {errors.accountName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.accountName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  Saya menyetujui{" "}
                  <a
                    href="/syarat-ketentuan"
                    className="text-violet-600 hover:text-violet-500"
                  >
                    Syarat & Ketentuan
                  </a>{" "}
                  dan{" "}
                  <a
                    href="/kebijakan-privasi"
                    className="text-violet-600 hover:text-violet-500"
                  >
                    Kebijakan Privasi
                  </a>{" "}
                  Donasiqu <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3.5 px-6 border border-transparent rounded-lg text-base font-medium text-white bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-md"
                }`}
              >
                {isSubmitting ? "Menyimpan..." : "Buat Campaign"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default GalangDanaBaru;
