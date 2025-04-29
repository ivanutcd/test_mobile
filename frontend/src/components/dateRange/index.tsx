import { HookForm } from '@components/form';
import { searchDatesformProps } from './props';
import DateRangeFields from './dateRangeFields';
import SearchButtons from '@components/searchButtons';
import { HookFormMethods } from '@components/form/hook-form';

const SearchDatesForm = <T,>({
  open,
  save,
  close,
}: searchDatesformProps<T>) => {
  if (!open) {
    return null;
  }

  console.log('xDD');

  const nameForm = 'customForm';

  const handleSubmit = (event: any) => {
    if (save && event) {
      let search = {};

      search = {
        ...search,
        fechaDesde: event.fechaDesde,
        fechaHasta: event.fechaHasta,
      };

      save(search as T);
    }

    if (close) {
      close();
    }
  };
  return (
    <>
      <HookForm nameForm={nameForm} onSubmit={handleSubmit}>
        {({ reset }: HookFormMethods) => {
          return (
            <>
              <DateRangeFields />
              <SearchButtons reset={reset} nameForm={nameForm} />
            </>
          );
        }}
      </HookForm>
    </>
  );
};

export default SearchDatesForm;
