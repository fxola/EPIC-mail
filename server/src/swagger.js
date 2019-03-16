export default {
  swagger: '2.0',
  info: {
    description: 'API Documentation for Epic Mail',
    version: '1.0.0',
    title: 'EPIC Mail'
  },
  basePath: '/api/v1',
  tags: [
    {
      name: 'auth',
      description: 'Handles User Signup and Signin'
    },
    {
      name: 'messages',
      description: 'Handles sending, retrieving and deleting messages'
    }
  ],
  schemes: ['http', 'https'],
  paths: {
    '/auth/signup': {
      post: {
        tags: ['auth'],
        summary: 'Create a user account',
        description: '',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  example: 'Jon'
                },
                lastName: {
                  type: 'string',
                  example: 'Bellion'
                },
                email: {
                  type: 'string',
                  example: 'jon@gmail.com'
                },
                password: {
                  type: 'string',
                  example: 'simpleandsweet'
                }
              }
            }
          }
        ],
        responses: {
          '201': {
            description: 'successful operation',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 201
                },
                data: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                      example: 'enjkdkjdfhjdkjd86332aksajhahbghGHggh-2'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Missing Parameter',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 400
                },
                error: {
                  type: 'string',
                  example: 'Missing parameter'
                }
              }
            }
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['auth'],
        summary: 'Login a user',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  example: 'jon@gmail.com'
                },
                password: {
                  type: 'string',
                  example: 'simpleandsweet'
                }
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 200
                },
                data: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                      example: 'enjkdkjdfhjdkjd86332aksajhahbghGHggh-2'
                    }
                  }
                },
                message: {
                  type: 'string',
                  example: 'Log In Succesful. Welcome jon@gmail.com'
                }
              }
            }
          },
          '401': {
            description: 'Incorrect Credentials',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 401
                },
                error: {
                  type: 'string',
                  example: 'Authentication Failed. Incorrect Password'
                },
                message: {
                  type: 'string',
                  example: 'Request Denied'
                }
              }
            }
          }
        }
      }
    },
    '/messages': {
      get: {
        tags: ['messages'],
        summary: 'Fetch all received emails',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                properties: {
                  id: {
                    type: 'integer',
                    example: 22
                  },
                  createdOn: {
                    type: 'string',
                    format: 'date-time'
                  },
                  subject: {
                    type: 'string',
                    example: 'Pre Order My Album'
                  },
                  message: {
                    type: 'string',
                    example: 'My Album, The Definition is out in all stores'
                  },
                  senderId: {
                    type: 'integer',
                    example: 4
                  },
                  receiverId: {
                    type: 'integer',
                    example: 10
                  },
                  parentMessageId: {
                    type: 'integer',
                    example: 21
                  },
                  status: {
                    type: 'string',
                    example: 'read'
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['messages'],
        summary: 'Create or send an email.',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                to: {
                  type: 'string',
                  example: 'shola@gmail.com'
                },
                subject: {
                  type: 'string',
                  example: 'Pre Order My Album'
                },
                message: {
                  type: 'string',
                  example: 'My Album, The Definition is out in all stores'
                }
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer'
                },
                data: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 24
                    },
                    createdOn: {
                      type: 'string',
                      format: 'date-time'
                    },
                    subject: {
                      type: 'string',
                      example: 'Pre order My Albuum'
                    },
                    message: {
                      type: 'string',
                      example: 'My Album, The Definition is out in all   stores'
                    },
                    parentMessageId: {
                      type: 'integer',
                      example: 23
                    },
                    status: {
                      type: 'string',
                      example: 'sent'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Failed to save',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 500
                },
                error: {
                  type: 'string',
                  example: 'Failed to save'
                }
              }
            }
          }
        }
      }
    },
    '/messages/unread': {
      get: {
        tags: ['messages'],
        summary: 'Fetch all unread received emails',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                properties: {
                  id: {
                    type: 'integer',
                    example: 23
                  },
                  createdOn: {
                    type: 'string',
                    format: 'date-time'
                  },
                  subject: {
                    type: 'string',
                    example: 'Pre Order My Album'
                  },
                  message: {
                    type: 'string',
                    example: 'My Album, The Definition is out in all   stores'
                  },
                  senderId: {
                    type: 'integer',
                    example: 4
                  },
                  receiverId: {
                    type: 'integer',
                    example: 10
                  },
                  parentMessageId: {
                    type: 'integer',
                    example: 22
                  },
                  status: {
                    type: 'string',
                    example: 'unread'
                  }
                }
              }
            }
          },
          '404': {
            description: 'Message does not Exist',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 404
                },
                error: {
                  type: 'string',
                  example: 'No Message  Found'
                },
                message: {
                  type: 'string',
                  example: 'Request unsuccessful'
                }
              }
            }
          }
        }
      }
    },
    '/messages/sent': {
      get: {
        tags: ['messages'],
        summary: 'Fetch sent emails',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                properties: {
                  id: {
                    type: 'integer',
                    example: 23
                  },
                  createdOn: {
                    type: 'string',
                    format: 'date-time'
                  },
                  subject: {
                    type: 'string',
                    example: 'Pre Order My Album'
                  },
                  message: {
                    type: 'string',
                    example: 'My Album, The Definition is out in all   stores'
                  },
                  senderId: {
                    type: 'integer',
                    example: 4
                  },
                  receiverId: {
                    type: 'integer',
                    example: 10
                  },
                  parentMessageId: {
                    type: 'integer',
                    example: 22
                  },
                  status: {
                    type: 'string',
                    example: 'sent'
                  }
                }
              }
            }
          },
          '404': {
            description: 'Message does not Exist',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 404
                },
                error: {
                  type: 'string',
                  example: 'No Message  Found'
                },
                message: {
                  type: 'string',
                  example: 'Request unsuccessful'
                }
              }
            }
          }
        }
      }
    },
    '/messages/{messageId}': {
      get: {
        tags: ['messages'],
        summary: 'Fetch a specific email record',
        produces: ['application/json'],
        parameters: [
          {
            name: 'messageId',
            in: 'path',
            description: 'ID of message to return',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer'
                },
                data: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer'
                    },
                    createdOn: {
                      type: 'string',
                      format: 'date-time'
                    },
                    subject: {
                      type: 'string'
                    },
                    message: {
                      type: 'string'
                    },
                    senderId: {
                      type: 'integer'
                    },
                    receiverId: {
                      type: 'integer'
                    },
                    parentMessageId: {
                      type: 'integer'
                    },
                    status: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Message does not Exist',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 404
                },
                error: {
                  type: 'string',
                  example: 'No Message  Found'
                },
                message: {
                  type: 'string',
                  example: 'Request unsuccessful'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['messages'],
        summary: 'Delete a specific email record',
        produces: ['application/json'],
        parameters: [
          {
            name: 'messageId',
            in: 'path',
            description: 'Message id to delete',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer'
                },
                data: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer'
                    },
                    createdOn: {
                      type: 'string',
                      format: 'date-time'
                    },
                    subject: {
                      type: 'string'
                    },
                    message: {
                      type: 'string'
                    },
                    senderId: {
                      type: 'integer'
                    },
                    receiverId: {
                      type: 'integer'
                    },
                    parentMessageId: {
                      type: 'integer'
                    },
                    status: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Message does not Exist',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 404
                },
                error: {
                  type: 'string',
                  example: 'No Message  Found'
                },
                message: {
                  type: 'string',
                  example: 'Request unsuccessful'
                }
              }
            }
          }
        }
      }
    }
  }
};
