import Link from 'next/link';
import Image from 'next/image';
import { apiService } from '@/lib/api';
import CountryFlag from '@/components/CountryFlag';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function WineryCard({ winery }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <Link href={`/vinicolas/${winery.slug}`} className="group">
          <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
            {winery.name}
          </CardTitle>
        </Link>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>
            {winery.region?.name}
            {winery.region?.country && (
              <>
                , <CountryFlag countryName={winery.region.country.name} size="w-3 h-3" /> {winery.region.country.name}
              </>
            )}
          </span>
        </div>
        
      </CardHeader>

      <CardContent className="pt-0">
        {/* Wine Carousel */}
        {winery.wines && winery.wines.length > 0 ? (
          <div className="space-y-4">
            <Carousel 
              className="w-full"
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {winery.wines.map((wine) => (
                  <CarouselItem key={wine.slug} className="basis-full">
                    <WineItem wine={wine} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {winery.wines.length > 1 && (
                <>
                  <CarouselPrevious className="left-2 bg-white hover:bg-gray-50 border-2 border-gray-200 shadow-lg" />
                  <CarouselNext className="right-2 bg-white hover:bg-gray-50 border-2 border-gray-200 shadow-lg" />
                </>
              )}
            </Carousel>
            
            <div className="pt-2 border-t">
              <Link href={`/vinicolas/${winery.slug}`}>
                <Button variant="outline" className="w-full">
                  Ver Detalhes da Vinícola
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-muted-foreground text-sm">
              Nenhum vinho disponível
            </div>
            <Link href={`/vinicolas/${winery.slug}`} className="mt-4 inline-block">
              <Button variant="outline">
                Ver vinícola
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function WineItem({ wine }) {
  const imageUrl = apiService.getWineImageUrl(wine.vivino_id);
  
  return (
    <Link href={`/vinhos/${wine.slug}`} className="block group">
      <div className="bg-muted/30 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
        {/* Wine Image */}
        <div className="relative h-48 bg-gradient-to-br from-purple-50 to-red-50 flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={wine.name}
              width={90}
              height={150}
              className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-300" style={{display: imageUrl ? 'none' : 'flex'}}>
            🍷
          </div>
        </div>

        {/* Wine Details */}
        <div className="p-4 space-y-2">
          <h4 className="font-semibold text-sm group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
            {wine.name}
          </h4>
          
          <div className="flex items-center justify-between">
            
            {wine.rating && (
              <div className="flex items-center">
                <span className="text-yellow-500 text-xs mr-1">⭐</span>
                <span className="text-xs font-medium">{wine.rating}</span>
              </div>
            )}
          </div>

          {wine.wine_style && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {wine.wine_style}
            </p>
          )}

          
        </div>
      </div>
    </Link>
  );
} 