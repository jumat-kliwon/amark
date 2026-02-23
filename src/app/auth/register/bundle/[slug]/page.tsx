'use client';

import { Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useRegisterBundle } from '@/hooks/use-auth';
import { useBundleDetail } from '@/hooks/use-bundle';
import { useBundleCalculateShipping } from '@/hooks/use-bundle-order';
import {
  useProvinces,
  useDistricts,
  useSubdistricts,
  useVillages,
} from '@/hooks/use-address';
import { useDebounce } from '@/hooks/use-debounce';
import { formatCurrency } from '@/lib/helpers';
import { formatPrice } from '@/lib/subscription-utils';
import { BundleService } from '@/services/bundle';
import { CheckCouponResponse } from '@/services/order/type';
import type { ShippingOptionItem } from '@/services/order/type';
import { AddressSearchSelect } from '@/components/AddressSearchSelect';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const bundleTypeLabels: Record<string, string> = {
  starter: 'Starter',
  premium: 'Premium',
  ultimate: 'Ultimate',
};

type RegisterBundle = {
  id: number;
  name: string;
  price: string;
  original_price: string | null;
  bundle_type: string | null;
};

function toRegisterBundle(b: {
  id: number;
  name: string;
  price: string;
  original_price: string | null;
  bundle_type: string | null;
}): RegisterBundle {
  return {
    id: b.id,
    name: b.name,
    price: b.price,
    original_price: b.original_price,
    bundle_type: b.bundle_type,
  };
}

function RegisterBundleContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [voucher, setVoucher] = useState('');
  const [couponResult, setCouponResult] = useState<CheckCouponResponse | null>(
    null,
  );
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);
  const [subdistrictId, setSubdistrictId] = useState<number | null>(null);
  const [villageId, setVillageId] = useState<number | null>(null);
  const [provinceSearch, setProvinceSearch] = useState('');
  const [districtSearch, setDistrictSearch] = useState('');
  const [subdistrictSearch, setSubdistrictSearch] = useState('');
  const [villageSearch, setVillageSearch] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOptionItem | null>(null);

  const router = useRouter();
  const params = useParams();
  const { mutate, isPending } = useRegisterBundle();
  const slug = params?.slug as string;

  const { bundle, loadingBundle } = useBundleDetail(slug);
  const activeBundle = bundle?.data ? toRegisterBundle(bundle.data) : null;
  const requiresShipping = bundle?.data?.requires_shipping === true;

  const { calculateShippingAsync, loadingCalculateShipping, shippingOptions } =
    useBundleCalculateShipping(slug);

  const debouncedProvinceSearch = useDebounce(provinceSearch, 300);
  const debouncedDistrictSearch = useDebounce(districtSearch, 300);
  const debouncedSubdistrictSearch = useDebounce(subdistrictSearch, 300);
  const debouncedVillageSearch = useDebounce(villageSearch, 300);

  const { provinces, isLoadingProvinces } = useProvinces(
    debouncedProvinceSearch,
  );
  const { districts: districtsData, isLoadingDistricts: loadingDistricts } =
    useDistricts(provinceId, debouncedDistrictSearch);
  const {
    subdistricts: subdistrictsData,
    isLoadingSubdistricts: loadingSubdistricts,
  } = useSubdistricts(districtId, debouncedSubdistrictSearch);
  const { villages: villagesData, isLoadingVillages: loadingVillages } =
    useVillages(subdistrictId, debouncedVillageSearch);

  const handleProvinceChange = (id: number) => {
    setProvinceId(id);
    setDistrictId(null);
    setSubdistrictId(null);
    setVillageId(null);
    setProvinceSearch('');
  };

  const handleDistrictChange = (id: number) => {
    setDistrictId(id);
    setSubdistrictId(null);
    setVillageId(null);
    setDistrictSearch('');
  };

  const handleSubdistrictChange = (id: number) => {
    setSubdistrictId(id);
    setVillageId(null);
    setSubdistrictSearch('');
  };

  const handleVillageChange = (id: number) => {
    setVillageId(id);
    setVillageSearch('');
  };

  const isAddressComplete =
    provinceId &&
    districtId &&
    subdistrictId &&
    villageId &&
    address.trim() &&
    postalCode.trim();

  const addressPayload = isAddressComplete
    ? {
        recipient_name: recipientName.trim(),
        recipient_phone: recipientPhone.trim(),
        address: address.trim(),
        province_id: provinceId!,
        district_id: districtId!,
        sub_district_id: subdistrictId!,
        village_id: villageId!,
        postal_code: postalCode.trim(),
      }
    : null;
  const addressPayloadStr = addressPayload
    ? JSON.stringify(addressPayload)
    : null;
  const debouncedAddressPayloadStr = useDebounce(addressPayloadStr, 500);

  useEffect(() => {
    if (!requiresShipping || !debouncedAddressPayloadStr || !slug) return;
    const payload = JSON.parse(debouncedAddressPayloadStr);
    setSelectedShipping(null);
    calculateShippingAsync({
      shipping_address: {
        ...payload,
        postal_code:
          typeof payload.postal_code === 'string'
            ? parseInt(payload.postal_code, 10) || payload.postal_code
            : payload.postal_code,
      },
    });
  }, [requiresShipping, debouncedAddressPayloadStr, slug]);

  const isShippingComplete =
    !requiresShipping || (isAddressComplete && selectedShipping);

  const onSubmit = () => {
    if (!activeBundle) return;
    if (
      requiresShipping &&
      (!provinceId ||
        !districtId ||
        !subdistrictId ||
        !villageId ||
        !address.trim() ||
        !postalCode.trim() ||
        !selectedShipping)
    )
      return;

    const payload: Parameters<typeof mutate>[0] = {
      phone_number: `+62${phone}`,
      name: username,
      email,
      password,
      password_confirmation: confirm,
      username,
      terms: agree,
      voucher_code: voucher || undefined,
      bundle_product_id: String(activeBundle.id),
      recipient_name: recipientName.trim() || undefined,
      recipient_phone: recipientPhone.trim() || undefined,
    };

    if (requiresShipping && selectedShipping) {
      payload.shipping_address = {
        address: address.trim(),
        province_id: provinceId!,
        district_id: districtId!,
        sub_district_id: subdistrictId!,
        village_id: villageId!,
        postal_code: postalCode.trim(),
      };
      payload.shipping_option = {
        courier_name: selectedShipping.courier_name,
        courier_service_name: selectedShipping.courier_service_name,
      };
    }

    mutate(payload);
  };

  const { mutate: validateCoupon, isPending: isValidatingCoupon } = useMutation(
    {
      mutationFn: async () => {
        if (!activeBundle) throw new Error('Bundle tidak ditemukan');
        const coupon = voucher.trim();
        if (!coupon) throw new Error('Kode promo kosong');
        return await BundleService.validateCoupon({
          bundle_product_id: String(activeBundle.id),
          coupon,
        });
      },
      onSuccess: (res) => {
        setCouponResult(res);
        setCouponMessage(res.message || 'Kupon valid');
      },
      onError: (error: unknown) => {
        setCouponResult(null);
        const err = error as { response?: { data?: { message?: string } } };
        setCouponMessage(
          err?.response?.data?.message || 'Kode promo tidak valid',
        );
      },
    },
  );

  if (!activeBundle && !loadingBundle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] gap-4">
        <p className="text-muted-foreground">Bundle tidak ditemukan</p>
        <Button variant="secondary" onClick={() => router.push('/bundles')}>
          Kembali ke Daftar Bundle
        </Button>
        <Button variant="outline" onClick={() => router.push('/')}>
          Kembali ke Home
        </Button>
      </div>
    );
  }

  if (!activeBundle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="h-16 w-16 rounded-full bg-zinc-800 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col space-y-8 items-center justify-center py-16">
      <div className="w-full max-w-3xl px-6">
        <h1 className="text-4xl font-bold text-center mb-2">
          Daftar <span className="font-extrabold">Bundle</span>
        </h1>
        <h2 className="text-4xl font-bold text-center mb-6">
          {activeBundle.name}
        </h2>

        <div className="border-b border-zinc-700 mb-8" />

        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-widest text-zinc-400 mb-2">
                DAPATKAN {activeBundle.name.toUpperCase()} DENGAN HANYA:
              </p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <p className="text-lg line-through text-zinc-500">
                  Rp
                  {formatCurrency(
                    Number(activeBundle.original_price ?? activeBundle.price),
                  )}
                </p>
                {couponResult ? (
                  <>
                    <p className="text-lg line-through text-zinc-500">
                      Rp{formatCurrency(Number(activeBundle.price))}
                    </p>
                    <p className="text-4xl font-bold text-red-500">
                      Rp{formatCurrency(Number(couponResult.data.final_price))}
                    </p>
                  </>
                ) : (
                  <p className="text-4xl font-bold text-red-500">
                    Rp{formatCurrency(Number(activeBundle.price))}
                  </p>
                )}
              </div>
            </div>
            {activeBundle.bundle_type && (
              <p className="text-sm text-zinc-400 md:text-right uppercase">
                (
                {bundleTypeLabels[activeBundle.bundle_type] ??
                  activeBundle.bundle_type}
                )
              </p>
            )}
          </div>

          <div className="border-b border-dashed border-zinc-700 mb-8" />

          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Phone*</Label>
              <div className="flex gap-2">
                <Input
                  className="w-20 bg-zinc-900 h-12 border-zinc-800"
                  value="+62"
                  disabled
                />
                <Input
                  className="flex-1 bg-zinc-900 h-12 border-zinc-800"
                  placeholder="812-345-678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Username*</Label>
              <Input
                className="bg-zinc-900 h-12 border-zinc-800"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Email*</Label>
              <Input
                type="email"
                className="bg-zinc-900 h-12 border-zinc-800"
                placeholder="yourmail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Password*</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="bg-zinc-900 h-12 border-zinc-800 pr-12"
                  placeholder="Masukan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password Confirmation*</Label>
              <div className="relative">
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  className="bg-zinc-900 h-12 border-zinc-800 pr-12"
                  placeholder="Masukkan Password Kembali"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kode Promo (Jika Ada)</Label>
              <Input
                className="bg-zinc-900 h-12 border-zinc-800"
                placeholder="Masukkan Kode Promo"
                value={voucher}
                onChange={(e) => {
                  setVoucher(e.target.value);
                  if (couponResult) setCouponResult(null);
                  if (couponMessage) setCouponMessage(null);
                }}
                onBlur={() => {
                  const code = voucher.trim();
                  if (!code) {
                    setCouponMessage(null);
                    return;
                  }
                  validateCoupon();
                }}
              />
              {isValidatingCoupon && (
                <p className="text-xs text-zinc-400">
                  Memvalidasi kode promo...
                </p>
              )}
              {couponMessage && (
                <p
                  className={`text-xs ${couponResult ? 'text-green-400' : 'text-red-400'}`}
                >
                  {couponMessage}
                  {couponResult && (
                    <span className="block mt-1">
                      Hemat Rp
                      {formatCurrency(
                        Number(couponResult.data.discount_amount),
                      )}
                    </span>
                  )}
                </p>
              )}
            </div>

            {requiresShipping && (
              <>
                <div className="border-t border-zinc-700 pt-6 mt-6">
                  <p className="text-sm font-medium mb-4">Alamat Pengiriman</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-sm">Nama Penerima</Label>
                      <Input
                        placeholder="Nama lengkap penerima"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="mt-1 bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">No. Telepon Penerima</Label>
                      <Input
                        placeholder="08xxxxxxxxxx"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        type="tel"
                        className="mt-1 bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Provinsi</Label>
                      <AddressSearchSelect
                        options={provinces}
                        isLoading={isLoadingProvinces}
                        value={provinceId}
                        onValueChange={handleProvinceChange}
                        search={provinceSearch}
                        onSearchChange={setProvinceSearch}
                        placeholder="Pilih provinsi"
                        searchPlaceholder="Cari provinsi..."
                        emptyText="Tidak ada provinsi ditemukan"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Kota/Kabupaten</Label>
                      <AddressSearchSelect
                        options={districtsData}
                        isLoading={loadingDistricts}
                        value={districtId}
                        onValueChange={handleDistrictChange}
                        search={districtSearch}
                        onSearchChange={setDistrictSearch}
                        placeholder="Pilih kota/kabupaten"
                        searchPlaceholder="Cari kota/kabupaten..."
                        emptyText="Tidak ada kota/kabupaten ditemukan"
                        disabled={!provinceId}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Kecamatan</Label>
                      <AddressSearchSelect
                        options={subdistrictsData}
                        isLoading={loadingSubdistricts}
                        value={subdistrictId}
                        onValueChange={handleSubdistrictChange}
                        search={subdistrictSearch}
                        onSearchChange={setSubdistrictSearch}
                        placeholder="Pilih kecamatan"
                        searchPlaceholder="Cari kecamatan..."
                        emptyText="Tidak ada kecamatan ditemukan"
                        disabled={!districtId}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Desa / Kelurahan</Label>
                      <AddressSearchSelect
                        options={villagesData}
                        isLoading={loadingVillages}
                        value={villageId}
                        onValueChange={handleVillageChange}
                        search={villageSearch}
                        onSearchChange={setVillageSearch}
                        placeholder="Pilih desa / kelurahan"
                        searchPlaceholder="Cari desa / kelurahan..."
                        emptyText="Tidak ada desa / kelurahan ditemukan"
                        disabled={!subdistrictId}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Kode Pos</Label>
                      <Input
                        placeholder="40132"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="mt-1 bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-sm">Alamat Lengkap</Label>
                      <Textarea
                        placeholder="Jl. Contoh No. 123"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={2}
                        className="mt-1 resize-none bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    {isAddressComplete && loadingCalculateShipping && (
                      <div className="flex items-center gap-2 text-sm text-zinc-400 sm:col-span-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Menghitung ongkos kirim...
                      </div>
                    )}
                  </div>
                </div>

                {isAddressComplete && (
                  <div className="border-t border-zinc-700 pt-6 mt-6">
                    <p className="text-sm font-medium mb-4">Pilih Pengiriman</p>
                    {loadingCalculateShipping ? (
                      <p className="flex items-center gap-2 text-sm text-zinc-400 py-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Memuat opsi pengiriman...
                      </p>
                    ) : shippingOptions.length > 0 ? (
                      <RadioGroup
                        value={
                          selectedShipping
                            ? `${selectedShipping.courier_name}-${selectedShipping.courier_service_name}`
                            : ''
                        }
                        onValueChange={(value) => {
                          const opt = shippingOptions.find(
                            (o) =>
                              `${o.courier_name}-${o.courier_service_name}` ===
                              value,
                          );
                          setSelectedShipping(opt ?? null);
                        }}
                        className="space-y-2 max-h-64 overflow-y-auto pr-2"
                      >
                        {shippingOptions.map((opt) => {
                          const isSelected =
                            selectedShipping?.courier_name ===
                              opt.courier_name &&
                            selectedShipping?.courier_service_name ===
                              opt.courier_service_name;
                          return (
                            <div
                              key={`${opt.courier_name}-${opt.courier_service_name}`}
                              className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${
                                isSelected
                                  ? 'border-red-600 bg-red-950/30'
                                  : 'border-zinc-800 hover:bg-zinc-800/50'
                              }`}
                            >
                              <RadioGroupItem
                                value={`${opt.courier_name}-${opt.courier_service_name}`}
                                id={`bundle-ship-${opt.courier_name}-${opt.courier_service_name}`}
                                className="border-zinc-600"
                              />
                              <Label
                                htmlFor={`bundle-ship-${opt.courier_name}-${opt.courier_service_name}`}
                                className="flex-1 cursor-pointer flex items-center justify-between gap-2"
                              >
                                <span className="font-medium">
                                  {opt.label ??
                                    `${opt.courier_name} - ${opt.courier_service_name}`}
                                </span>
                                {(opt.price != null ||
                                  opt.shipping_fee != null) && (
                                  <span className="text-red-500 font-semibold shrink-0">
                                    {formatPrice(
                                      String(
                                        opt.price ?? opt.shipping_fee ?? 0,
                                      ),
                                    )}
                                  </span>
                                )}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    ) : (
                      <p className="text-sm text-zinc-400 py-4">
                        Tidak ada opsi pengiriman untuk alamat ini
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            <div className="flex items-start gap-2 text-sm">
              <Checkbox
                id="agree-bundle"
                checked={agree}
                onCheckedChange={(v) => setAgree(Boolean(v))}
                className="border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
              />
              <Label htmlFor="agree-bundle" className="leading-relaxed">
                Dengan mendaftar, saya menerima terms & privacy policy
              </Label>
            </div>

            <Button
              disabled={!agree || isPending || !isShippingComplete}
              className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base"
              onClick={onSubmit}
            >
              DAFTAR BUNDLE
            </Button>
          </div>

          <div className="text-center mt-10 p-4 bg-zinc-800/50 rounded-lg">
            <p className="text-xs text-zinc-400 mb-2">Harga Normal</p>
            <p className="text-lg line-through text-zinc-500 mb-2">
              Rp
              {formatCurrency(
                Number(activeBundle.original_price ?? activeBundle.price),
              )}
            </p>
            {couponResult ? (
              <>
                <p className="text-xs text-zinc-400 mb-1">Harga Promo</p>
                <p className="text-lg line-through text-zinc-500 mb-2">
                  Rp{formatCurrency(Number(activeBundle.price))}
                </p>
                <p className="text-xs text-green-400 mb-2">
                  Diskon Rp
                  {formatCurrency(Number(couponResult.data.discount_amount))}
                </p>
                <p className="text-xs text-zinc-400 mb-1">
                  Harga Setelah Kupon
                </p>
                <p className="text-3xl font-bold text-red-500">
                  Rp{formatCurrency(Number(couponResult.data.final_price))}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-zinc-400 mb-1">
                  Harga Setelah Diskon
                </p>
                <p className="text-3xl font-bold text-red-500">
                  Rp{formatCurrency(Number(activeBundle.price))}
                </p>
              </>
            )}
          </div>
        </div>

        <p className="text-center my-5">
          Sudah punya akun?{' '}
          <span
            className="text-red-500 underline cursor-pointer"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </span>
        </p>
      </div>
      <Button
        variant="secondary"
        className="flex items-center gap-5"
        onClick={() => router.push('/bundles')}
      >
        <ChevronLeft />
        Kembali ke Bundle
      </Button>
    </div>
  );
}

export default function RegisterBundlePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#121212]">
          <div className="h-16 w-16 rounded-full bg-zinc-800 animate-pulse" />
        </div>
      }
    >
      <RegisterBundleContent />
    </Suspense>
  );
}
