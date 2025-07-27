import React, { useState, useEffect } from 'react';
    import { Save, Loader2, Edit3, Calendar as CalendarIcon } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
    import { Calendar } from "@/components/ui/calendar";
    import { format } from "date-fns";
    import { es, enUS } from 'date-fns/locale';
    import { nationalities } from '@/lib/nationalities';
    import { cn } from '@/lib/utils';
    import { useTranslation } from 'react-i18next';

    export default function ProfileInfoTab({ userProfile, onSave, isSaving }) {
      const { t, i18n } = useTranslation();
      const [isEditing, setIsEditing] = useState(false);
      const [formData, setFormData] = useState(userProfile);

      useEffect(() => {
        if (!isEditing) {
          setFormData(userProfile);
        }
      }, [userProfile, isEditing]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleDateChange = (date) => {
        setFormData(prev => ({...prev, birth_date: date ? format(date, 'yyyy-MM-dd') : null}))
      };

      const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSaveClick = async () => {
        const { error } = await onSave(formData);
        if (!error) {
          setIsEditing(false);
        }
      };

      const InfoField = ({ label, value }) => (
        <div>
          <Label className="text-muted-foreground text-sm">{label}</Label>
          <div className="p-3 bg-muted/50 rounded-lg text-foreground min-h-[44px] flex items-center">{value || '-'}</div>
        </div>
      );

      const documentTypes = [
        { value: 'id_card', label: t('profile.infoTab.docTypes.id_card') },
        { value: 'passport', label: t('profile.infoTab.docTypes.passport') },
        { value: 'driving_license', label: t('profile.infoTab.docTypes.driving_license') }
      ];

      const currentLocale = i18n.language === 'es' ? es : enUS;

      return (
        <div className="bg-card p-8 rounded-xl border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">{t('profile.infoTab.title')}</h2>
            <Button
              onClick={() => isEditing ? handleSaveClick() : setIsEditing(true)}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEditing ? (
                <Save className="w-4 h-4 mr-2" />
              ) : (
                <Edit3 className="w-4 h-4 mr-2" />
              )}
              {isSaving ? t('profile.infoTab.saving') : isEditing ? t('profile.infoTab.save') : t('profile.infoTab.edit')}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="full_name" className="text-muted-foreground text-sm">{t('profile.infoTab.fullName')} <span className="text-red-500">*</span></Label>
                  <Input id="full_name" name="full_name" value={formData.full_name || ''} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="birth_date" className="text-muted-foreground text-sm">{t('profile.infoTab.birthDate')}</Label>
                   <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.birth_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.birth_date ? format(new Date(formData.birth_date + 'T00:00:00'), "PPP", { locale: currentLocale }) : <span>{t('profile.infoTab.selectDate')}</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.birth_date ? new Date(formData.birth_date + 'T00:00:00') : null}
                        onSelect={handleDateChange}
                        initialFocus
                        locale={currentLocale}
                        captionLayout="dropdown-buttons"
                        fromYear={1920}
                        toYear={new Date().getFullYear()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="nationality" className="text-muted-foreground text-sm">{t('profile.infoTab.nationality')} <span className="text-red-500">*</span></Label>
                  <Select name="nationality" onValueChange={(val) => handleSelectChange('nationality', val)} value={formData.nationality} required>
                    <SelectTrigger>
                      <SelectValue placeholder={t('profile.infoTab.selectNationality')} />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {nationalities.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="address" className="text-muted-foreground text-sm">{t('profile.infoTab.address')} <span className="text-red-500">*</span></Label>
                  <Input id="address" name="address" value={formData.address || ''} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="document_type" className="text-muted-foreground text-sm">{t('profile.infoTab.docType')} <span className="text-red-500">*</span></Label>
                  <Select name="document_type" onValueChange={(val) => handleSelectChange('document_type', val)} value={formData.document_type} required>
                    <SelectTrigger>
                      <SelectValue placeholder={t('profile.infoTab.selectDocType')} />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="document_number" className="text-muted-foreground text-sm">{t('profile.infoTab.docNumber')} <span className="text-red-500">*</span></Label>
                  <Input id="document_number" name="document_number" value={formData.document_number || ''} onChange={handleChange} required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="ssn_itin" className="text-muted-foreground text-sm">{t('profile.infoTab.ssn')}</Label>
                  <Input id="ssn_itin" name="ssn_itin" value={formData.ssn_itin || ''} onChange={handleChange} />
                </div>
              </>
            ) : (
              <>
                <InfoField label={t('profile.infoTab.fullName')} value={userProfile.full_name} />
                <InfoField label={t('profile.infoTab.birthDate')} value={userProfile.birth_date ? format(new Date(userProfile.birth_date + 'T00:00:00'), "PPP", { locale: currentLocale }) : '-'} />
                <InfoField label={t('profile.infoTab.nationality')} value={nationalities.find(n => n.value === userProfile.nationality)?.label} />
                <InfoField label={t('profile.infoTab.address')} value={userProfile.address} />
                <InfoField label={t('profile.infoTab.docType')} value={documentTypes.find(d => d.value === userProfile.document_type)?.label} />
                <InfoField label={t('profile.infoTab.docNumber')} value={userProfile.document_number} />
                 <div className="md:col-span-2">
                  <InfoField label={t('profile.infoTab.ssn')} value={userProfile.ssn_itin} />
                </div>
              </>
            )}
          </div>
        </div>
      );
    }