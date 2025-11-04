import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const POPULAR_SOURCES = [
  { value: 'google', label: 'Google' },
  { value: 'yandex', label: 'Yandex' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'vk', label: 'VK' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'email', label: 'Email' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'youtube', label: 'YouTube' },
];

const POPULAR_MEDIUMS = [
  { value: 'cpc', label: 'CPC (Контекст)' },
  { value: 'cpm', label: 'CPM (Баннеры)' },
  { value: 'social', label: 'Social (Соцсети)' },
  { value: 'email', label: 'Email (Рассылка)' },
  { value: 'referral', label: 'Referral (Реферал)' },
  { value: 'organic', label: 'Organic (Органика)' },
];

const POPULAR_CAMPAIGNS = [
  { value: 'spring_sale', label: 'Весенняя распродажа' },
  { value: 'black_friday', label: 'Черная пятница' },
  { value: 'new_product', label: 'Новый продукт' },
  { value: 'promo', label: 'Промо-акция' },
  { value: 'brand', label: 'Брендовая кампания' },
];

export default function Index() {
  const { toast } = useToast();
  const [baseUrl, setBaseUrl] = useState('https://example.com');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('');

  const generateUrl = () => {
    try {
      const url = new URL(baseUrl);
      const params = new URLSearchParams();

      if (utmSource) params.append('utm_source', utmSource);
      if (utmMedium) params.append('utm_medium', utmMedium);
      if (utmCampaign) params.append('utm_campaign', utmCampaign);
      if (utmTerm) params.append('utm_term', utmTerm);
      if (utmContent) params.append('utm_content', utmContent);

      const generatedUrl = `${url.origin}${url.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      return generatedUrl;
    } catch {
      return '';
    }
  };

  const copyToClipboard = async () => {
    const url = generateUrl();
    if (!url) {
      toast({
        title: 'Ошибка',
        description: 'Проверьте правильность заполнения полей',
        variant: 'destructive',
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: '✨ Скопировано!',
        description: 'UTM-ссылка скопирована в буфер обмена',
      });
    } catch {
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать ссылку',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setBaseUrl('https://example.com');
    setUtmSource('');
    setUtmMedium('');
    setUtmCampaign('');
    setUtmTerm('');
    setUtmContent('');
  };

  const generatedUrl = generateUrl();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <Icon name="Link" size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Генератор UTM меток
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Создавайте профессиональные UTM-метки для отслеживания эффективности ваших маркетинговых кампаний
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8 backdrop-blur-sm bg-card/50 border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <div className="space-y-6">
              <div>
                <Label htmlFor="baseUrl" className="text-base font-semibold flex items-center gap-2">
                  <Icon name="Globe" size={16} className="text-primary" />
                  Базовый URL
                  <Badge variant="outline" className="ml-auto">Обязательно</Badge>
                </Label>
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="mt-2 h-12 text-base bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="utmSource" className="text-base font-semibold flex items-center gap-2">
                  <Icon name="Target" size={16} className="text-primary" />
                  Источник (utm_source)
                  <Badge variant="outline" className="ml-auto">Обязательно</Badge>
                </Label>
                <Select value={utmSource} onValueChange={setUtmSource}>
                  <SelectTrigger className="mt-2 h-12 bg-background/50">
                    <SelectValue placeholder="Выберите или введите вручную" />
                  </SelectTrigger>
                  <SelectContent>
                    {POPULAR_SOURCES.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  placeholder="или введите своё значение"
                  className="mt-2 h-10 text-sm bg-background/30"
                />
              </div>

              <div>
                <Label htmlFor="utmMedium" className="text-base font-semibold flex items-center gap-2">
                  <Icon name="Megaphone" size={16} className="text-secondary" />
                  Канал (utm_medium)
                </Label>
                <Select value={utmMedium} onValueChange={setUtmMedium}>
                  <SelectTrigger className="mt-2 h-12 bg-background/50">
                    <SelectValue placeholder="Выберите канал" />
                  </SelectTrigger>
                  <SelectContent>
                    {POPULAR_MEDIUMS.map((medium) => (
                      <SelectItem key={medium.value} value={medium.value}>
                        {medium.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  placeholder="или введите своё значение"
                  className="mt-2 h-10 text-sm bg-background/30"
                />
              </div>

              <div>
                <Label htmlFor="utmCampaign" className="text-base font-semibold flex items-center gap-2">
                  <Icon name="Rocket" size={16} className="text-accent" />
                  Кампания (utm_campaign)
                </Label>
                <Select value={utmCampaign} onValueChange={setUtmCampaign}>
                  <SelectTrigger className="mt-2 h-12 bg-background/50">
                    <SelectValue placeholder="Выберите кампанию" />
                  </SelectTrigger>
                  <SelectContent>
                    {POPULAR_CAMPAIGNS.map((campaign) => (
                      <SelectItem key={campaign.value} value={campaign.value}>
                        {campaign.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  placeholder="или введите своё значение"
                  className="mt-2 h-10 text-sm bg-background/30"
                />
              </div>

              <div>
                <Label htmlFor="utmTerm" className="text-base font-semibold flex items-center gap-2">
                  <Icon name="Tag" size={16} className="text-muted-foreground" />
                  Ключевое слово (utm_term)
                  <Badge variant="secondary" className="ml-auto text-xs">Опционально</Badge>
                </Label>
                <Input
                  id="utmTerm"
                  value={utmTerm}
                  onChange={(e) => setUtmTerm(e.target.value)}
                  placeholder="купить кроссовки"
                  className="mt-2 h-12 bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="utmContent" className="text-base font-semibold flex items-center gap-2">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                  Контент (utm_content)
                  <Badge variant="secondary" className="ml-auto text-xs">Опционально</Badge>
                </Label>
                <Input
                  id="utmContent"
                  value={utmContent}
                  onChange={(e) => setUtmContent(e.target.value)}
                  placeholder="banner_top"
                  className="mt-2 h-12 bg-background/50"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1 h-12 hover:scale-105 transition-transform"
                >
                  <Icon name="RotateCcw" size={18} className="mr-2" />
                  Очистить
                </Button>
                <Button
                  onClick={copyToClipboard}
                  disabled={!generatedUrl}
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all shadow-lg"
                >
                  <Icon name="Copy" size={18} className="mr-2" />
                  Копировать ссылку
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-8 backdrop-blur-sm bg-card/50 border-accent/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Sparkles" size={20} className="text-accent" />
                <h2 className="text-2xl font-bold">Результат</h2>
              </div>
              
              {generatedUrl ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-primary/20 break-all font-mono text-sm">
                    {generatedUrl}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground">Параметры:</h3>
                    <div className="space-y-2">
                      {utmSource && (
                        <div className="flex items-center gap-2 p-2 rounded bg-primary/10">
                          <Badge variant="outline" className="bg-primary text-primary-foreground">utm_source</Badge>
                          <span className="text-sm">{utmSource}</span>
                        </div>
                      )}
                      {utmMedium && (
                        <div className="flex items-center gap-2 p-2 rounded bg-secondary/10">
                          <Badge variant="outline" className="bg-secondary text-secondary-foreground">utm_medium</Badge>
                          <span className="text-sm">{utmMedium}</span>
                        </div>
                      )}
                      {utmCampaign && (
                        <div className="flex items-center gap-2 p-2 rounded bg-accent/10">
                          <Badge variant="outline" className="bg-accent text-accent-foreground">utm_campaign</Badge>
                          <span className="text-sm">{utmCampaign}</span>
                        </div>
                      )}
                      {utmTerm && (
                        <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                          <Badge variant="outline">utm_term</Badge>
                          <span className="text-sm">{utmTerm}</span>
                        </div>
                      )}
                      {utmContent && (
                        <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                          <Badge variant="outline">utm_content</Badge>
                          <span className="text-sm">{utmContent}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="LinkIcon" size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Заполните поля для генерации UTM-ссылки</p>
                </div>
              )}
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Совет</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Используйте понятные названия для меток. Например, для рекламы в Google Ads укажите <code className="px-1 py-0.5 rounded bg-background/50">utm_source=google</code> и <code className="px-1 py-0.5 rounded bg-background/50">utm_medium=cpc</code>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
