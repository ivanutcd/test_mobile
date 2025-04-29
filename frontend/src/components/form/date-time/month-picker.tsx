import { Controller, useFormContext } from 'react-hook-form';
import { ControlForm } from '../control-form.ts';
//import { MonthCalendar } from '@mui/x-date-pickers';
import { FormControl } from '@mui/material';
//import { DateTime } from 'luxon';
//import { useExtractedStatus } from '@components/form/use-extracted-status.tsx';
//import { useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface Props extends ControlForm {}

//const MonthCalendarComponent = ({ label, name, readOnly }: Props) => {
const MonthCalendarComponent = ({ name }: Props) => {
  const { control } = useFormContext();
  //const status = useExtractedStatus(name);

  return (
    <>
      <FormControl component="fieldset" fullWidth>
        <Controller
          name={name}
          control={control}
          render={() => (
            // <MonthCalendar
            //   // onError={() => {
            //   //   setHasError(true); // Activa el estado de error
            //   // }}
            //   {...field}

            //   // slotProps={{
            //   //   textField: {
            //   //     id: name,
            //   //     name: name,
            //   //     helperText: (status?.hasError
            //   //       ? status.errorMsg
            //   //       : '') as string,
            //   //     error: status?.hasError, //|| hasError,
            //   //   },
            //   // }}
            //   disableFuture={false}
            //   // label={label}
            //   value={field.value ? DateTime.fromJSDate(field.value) : null}
            //   onChange={value => {
            //     value
            //       ? field.onChange((value as DateTime).toJSDate())
            //       : field.onChange(null);
            //   }}
            //   disabled={readOnly}
            // />
            <DateCalendar
              // defaultValue={dayjs('2022-04-17')}
              views={['month', 'year']}
              openTo="month"
            />
          )}
        />
      </FormControl>
    </>
  );
};

export default MonthCalendarComponent;
