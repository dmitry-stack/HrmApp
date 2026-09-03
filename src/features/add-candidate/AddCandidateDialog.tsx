import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/ui/select';
import { useCreateCandidateMutation } from '@/entities/candidate/api/candidate.queries';
import type { CreateCandidateDto } from '@/entities/candidate/model/types';
import { ActionButton } from '../action-button/ActionButton';
import plus from '@/shared/assets/header/plus.svg';

export function AddCandidateDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateCandidateMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateCandidateDto>({
    defaultValues: {
      name: '',
      city: '',
      title: '',
      resumeUrl: '',
      owner: '',
      source: 'Other',
      profileRequest: 'Pending',
    },
  });

  const onSubmit = (values: CreateCandidateDto) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <ActionButton label="Add candidate" icon={{ left: plus }} variant="primary" />
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add candidate</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2">
              Name
            </Label>
            <Input
              id="name"
              className="focus-visible:ring-1 focus-visible:ring-[#707FDD] focus-visible:border-[#707FDD]"
              {...register('name', { required: 'Field is requiered' })}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="city" className="mb-2">
              City
            </Label>
            <Input
              id="city"
              className="focus-visible:ring-1 focus-visible:ring-[#707FDD] focus-visible:border-[#707FDD]"
              {...register('city', { required: 'Field is requiered' })}
            />
            {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
          </div>
          <div>
            <Label htmlFor="title" className="mb-2">
              Title
            </Label>
            <Input
              id="title"
              className="focus-visible:ring-1 focus-visible:ring-[#707FDD] focus-visible:border-[#707FDD] "
              {...register('title', { required: 'Field is requiered' })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="resumeUrl" className="mb-2">
              Resume URL
            </Label>
            <Input
              id="resumeUrl"
              className="focus-visible:ring-1 focus-visible:ring-[#707FDD] focus-visible:border-[#707FDD]"
              {...register('resumeUrl', {
                pattern: { value: /^https?:\/\/.+/, message: 'Invalid URL' },
              })}
            />
            {errors.resumeUrl && (
              <p className="text-sm text-red-500">{errors.resumeUrl.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="owner" className="mb-2">
              Owner
            </Label>
            <Input
              id="owner"
              className="focus-visible:ring-1 focus-visible:ring-[#707FDD] focus-visible:border-[#707FDD] "
              {...register('owner')}
            />
            {errors.owner && (
              <p className="text-sm text-red-500">{errors.owner.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Source</Label>
            <Select
              value={'source'}
              onValueChange={(v) => setValue('source', v as CreateCandidateDto['source'])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="HeadHunter">HeadHunter</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Career Site">Career Site</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-[#6472CA]" disabled={isPending}>
              {isPending ? 'Adding...' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
