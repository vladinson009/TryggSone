/* eslint-disable @next/next/no-img-element */
import Container from '@/components/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { dateFormatter } from '@/lib/dateFormatter';
import { PaginatedResult } from '@tryggsone/common/types';
import { PaginationIconsOnly } from './pagination';

//TODO: Type BikesForSale must be imported from common package after version ^1.0.20
type BikesForSale = {
  id: string;
  ownerId: string;
  description: string | null;
  status: 'active' | 'for_sale' | 'stolen' | 'deleted';
  brand: string;
  model: string;
  isElectric: boolean;
  condition: string;
  price: number;
  updatedAt: Date;
  photo: string | null;
};

type SearchParams = Promise<{
  page: string;
  limit: string;
}>;

export default async function BikesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { limit, page } = await searchParams;
  const query = `?limit=${limit ?? 25}&page=${page ?? 1}`;

  const response = await fetch(`http://bff-srv:3000/api/bikes/for-sale${query}`);
  const data: PaginatedResult<BikesForSale> = await response.json();
  const bikes = data.data;

  return (
    <Container as="section" className="pt-5">
      <PaginationIconsOnly totalPages={data.pagination.totalPages} />

      <div className="flex flex-wrap justify-center gap-5">
        {bikes.map((bike) => {
          return (
            <Link
              className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)] max-w-sm"
              href={`/bikes/${bike.id}`}
              key={bike.id}
            >
              <Card className="h-full">
                <img
                  src={bike.photo || undefined}
                  alt={bike.model}
                  className="relative z-20 aspect-video w-full object-cover"
                />
                <CardHeader>
                  <div className="flex flex-wrap">
                    <Badge variant="secondary">{bike.condition}</Badge>
                    <Badge variant="secondary">
                      {bike.isElectric ? 'electric' : 'non-electric'}
                    </Badge>
                    <Badge variant="secondary">
                      {dateFormatter(bike.updatedAt)}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{bike.model}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    <p>{bike.description}</p>
                    <p className="text-nowrap truncate">
                      ownerId: <span>{bike.ownerId}</span>
                    </p>
                  </CardDescription>
                  <p className="font-semibold">{bike.price} kr</p>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button className="w-full">View Offer</Button>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
