/* eslint-disable @next/next/no-img-element */
import Container from '@/components/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { BikeResponse, PaginatedResult } from '@tryggsone/common/types';

export default async function BikesPage() {
  const response = await fetch('http://bff-srv:3000/api/bikes');
  const data: PaginatedResult<BikeResponse> = await response.json();
  const bikes = data.data;

  return (
    <Container as="section" className="pt-5">
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
                  src="https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Event cover"
                  className="relative z-20 aspect-video w-full object-cover"
                />
                <CardHeader>
                  <CardAction>
                    <Badge variant="secondary">Featured</Badge>
                  </CardAction>
                  <CardTitle className="line-clamp-2">{bike.model}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    <p>{bike.description}</p>
                    <p className="text-nowrap truncate">
                      ownerId: <span>{bike.ownerId}</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button className="w-full">View Event</Button>
                </CardFooter>
              </Card>
              {/* <CardDescription>{bike.description}</CardDescription> */}
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
