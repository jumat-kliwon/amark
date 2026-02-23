'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AddressSearchSelect } from '@/components/AddressSearchSelect';
import { useCatalogDetail } from '@/hooks/use-catalog';
import {
  useProvinces,
  useDistricts,
  useSubdistricts,
  useVillages,
} from '@/hooks/use-address';
import { useDebounce } from '@/hooks/use-debounce';
import {
  useCalculateShipping,
  useCatalogOrder,
} from '@/hooks/use-catalog-order';
import { formatPrice } from '@/lib/subscription-utils';
import type { ShippingOptionItem } from '@/services/order/type';

export default function CatalogCheckoutPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { catalog, loadingCatalog } = useCatalogDetail(slug);

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
  const [couponCode, setCouponCode] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOptionItem | null>(null);

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

  const { calculateShippingAsync, loadingCalculateShipping, shippingOptions } =
    useCalculateShipping();
  const { postCatalogOrder, loadingPostOrder } = useCatalogOrder();

  const handleProvinceChange = (id: number) => {
    setProvinceId(id);
    setDistrictId(null);
    setSubdistrictId(null);
    setProvinceSearch('');
  };

  const handleDistrictChange = (id: number) => {
    setDistrictId(id);
    setSubdistrictId(null);
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
    if (!debouncedAddressPayloadStr || !catalog?.data?.id) return;
    if (catalog.data.requires_shipping === false) return;
    const shippingAddress = JSON.parse(debouncedAddressPayloadStr);
    setSelectedShipping(null);
    calculateShippingAsync({
      product_id: catalog.data.id,
      quantity: 1,
      recipient_name: recipientName.trim() || undefined,
      recipient_phone: recipientPhone.trim() || undefined,
      shipping_address: shippingAddress,
    });
  }, [
    debouncedAddressPayloadStr,
    catalog?.data?.id,
    catalog?.data?.requires_shipping,
  ]);

  const handlePlaceOrder = () => {
    if (!catalog?.data?.id) return;

    const requiresShipping = catalog.data.requires_shipping !== false;
    if (requiresShipping) {
      if (
        !selectedShipping ||
        !provinceId ||
        !districtId ||
        !subdistrictId ||
        !villageId ||
        !address.trim() ||
        !postalCode.trim()
      ) {
        return;
      }
      postCatalogOrder({
        product_id: catalog.data.id,
        coupon: couponCode.trim() || undefined,
        recipient_name: recipientName.trim() || undefined,
        recipient_phone: recipientPhone.trim() || undefined,
        shipping_address: {
          address: address.trim(),
          province_id: provinceId,
          district_id: districtId,
          sub_district_id: subdistrictId,
          village_id: villageId,
          postal_code: postalCode.trim(),
        },
        shipping_option: {
          courier_name: selectedShipping.courier_name,
          courier_service_name: selectedShipping.courier_service_name,
        },
      });
    } else {
      postCatalogOrder({
        product_id: catalog.data.id,
        coupon: couponCode.trim() || undefined,
      });
    }
  };

  if (loadingCatalog) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Memuat...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!catalog?.data) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Produk tidak ditemukan</h1>
            <Link
              href="/catalog"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Kembali ke Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const product = catalog.data;
  const requiresShipping = product.requires_shipping !== false;
  const productPrice = parseFloat(product.price);
  const shippingCost = selectedShipping
    ? (selectedShipping.price ?? selectedShipping.shipping_fee ?? 0)
    : 0;
  const subTotal = productPrice + (requiresShipping ? shippingCost : 0);

  const productImage =
    product.thumbnail_url ||
    (product.thumbnail
      ? `https://lms.acrehub.lol/storage/${product.thumbnail}`
      : null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
        <Link
          href={`/catalog/${slug}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke detail produk
        </Link>

        <div className="space-y-6">
          {/* Ringkasan Belanja - di atas */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-lg font-semibold">Ringkasan Belanja</h2>
              <div className="flex gap-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                  {productImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={productImage}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
                      -
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-primary">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Masukkan kode kupon"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value.toUpperCase())
                    }
                    className="flex-1"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Item (1)</span>
                  <span>{formatPrice(product.price)}</span>
                </div>
                {requiresShipping && selectedShipping && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ongkos kirim</span>
                    <span>{formatPrice(String(shippingCost))}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 font-medium">
                  <span>Sub Total</span>
                  <span>{formatPrice(String(subTotal))}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Field Pengiriman - di bawah, hanya jika requires_shipping */}
          {requiresShipping && (
            <Card>
              <CardContent className="pt-6">
                <h2 className="mb-4 text-lg font-semibold">
                  Alamat Pengiriman
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-sm">Nama Penerima</Label>
                    <Input
                      placeholder="Nama lengkap penerima"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">No. Telepon Penerima</Label>
                    <Input
                      placeholder="08xxxxxxxxxx"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="mt-1"
                      type="tel"
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
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-sm">Alamat Lengkap</Label>
                    <Textarea
                      placeholder="Jl. Contoh No. 123"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={2}
                      className="mt-1 resize-none"
                    />
                  </div>
                  {isAddressComplete && loadingCalculateShipping && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground sm:col-span-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Menghitung ongkos kirim...
                    </div>
                  )}
                </div>

                {shippingOptions.length > 0 && (
                  <div className="mt-4 border-t border-border pt-4">
                    <Label className="mb-2 block text-sm">
                      Pilih Pengiriman
                    </Label>
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
                      className="space-y-2"
                    >
                      {shippingOptions.map((opt) => (
                        <div
                          key={`${opt.courier_name}-${opt.courier_service_name}`}
                          className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50"
                        >
                          <RadioGroupItem
                            value={`${opt.courier_name}-${opt.courier_service_name}`}
                            id={`${opt.courier_name}-${opt.courier_service_name}`}
                          />
                          <Label
                            htmlFor={`${opt.courier_name}-${opt.courier_service_name}`}
                            className="flex flex-1 cursor-pointer items-center justify-between gap-2"
                          >
                            <span className="text-sm font-medium">
                              {opt.label ??
                                `${opt.courier_name} - ${opt.courier_service_name}`}
                            </span>
                            {(opt.price != null ||
                              opt.shipping_fee != null) && (
                              <span className="text-sm font-medium text-primary">
                                {formatPrice(
                                  String(opt.price ?? opt.shipping_fee ?? 0),
                                )}
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Button
            onClick={handlePlaceOrder}
            disabled={
              (requiresShipping && !selectedShipping) || loadingPostOrder
            }
            className="w-full"
          >
            {loadingPostOrder ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                Proses Pembayaran
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
