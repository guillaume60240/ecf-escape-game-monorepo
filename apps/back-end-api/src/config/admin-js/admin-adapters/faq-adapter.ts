import { Faq } from '@/entity/faq.entity';

export const faqAdapter = {
  resource: Faq,
  options: {
    navigation: { name: 'FAQ' },
    id: 'FAQ',
    edit: {
      isAccessible: true,
      isVisible: true,
    },
    new: {
      isAccessible: true,
      isVisible: true,
    },
    delete: {
      isAccessible: true,
      isVisible: true,
    },
    properties: {
      id: {
        isVisible: false,
      },
      question: {
        isTitle: true,
      },
      answer: {
        type: 'richtext',
      },
    },
    actions: {
      new: {
        before: async (request, { currentAdmin }) => {
          console.log('request', request);
          console.log('currentAdmin', currentAdmin);
          return request;
        },
      },
      edit: {
        before: async (request, { currentAdmin }) => {
          return request;
        },
      },
      delete: {
        before: async (request, { currentAdmin }) => {
          return request;
        },
      },
    },
  },
};
