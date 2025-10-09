import * as yup from 'yup';

const projectSchema = yup.object({
  name: yup
    .string()
    .required('O nome do projeto é obrigatório.')
    .matches(/(\w.+\s).+/, 'Digite ao menos duas palavras.')
    .label('Nome do projeto'),

  client: yup
    .string()
    .required('O nome do cliente é obrigatório.')
    .min(1, 'Digite ao menos uma palavra.')
    .label('Cliente'),

  startDate: yup
    .date()
    .required('A data de início é obrigatória.')
    .typeError('Selecione uma data válida.')
    .label('Data de Início'),

  endDate: yup
    .date()
    .required('A data final é obrigatória.')
    .typeError('Selecione uma data válida.')
    .min(yup.ref('startDate'), 'A data final não pode ser anterior à data de início.')
    .label('Data Final'),
});

export default projectSchema;
