export default {
  // Models names
  project: 'project',
  skill: 'skill',
  aboutMe: 'about_me',
  user: 'user',
  projectSkill: 'project_skill',
  projectImage: 'project_image',
  skills: 'skills',
  projects: 'projects',
  users: 'users',
  projectImages: 'project_images',
  images: 'images',
  role: 'role',
  roles: 'roles',
  systemVariable: 'system_variable',
  systemVariableRoutine: 'system_variable_routine',
  acessMetricsRoutine: 'acess_metrics_routine',
  applicationConfigProvider: 'application_config_provider',
  experience: 'experience',
  acessMetrics: 'acess_metrics',
  cacheProvider: 'cache_provider',
  suggestion: 'suggestion',

  // Models Properties
  idSkill: 'idSkill',
  idProject: 'idProject',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  idRole: 'idRole',
  pathCv: 'pathCv',
  pathProfilePic: 'pathProfilePic',

  // Messages
  applicationRunning: 'Application running on port:',
  serverMode: 'Server mode:',
  urlNotFound: 'URL not found',
  projectIsCreated: 'Project is created',
  projectIsUpdated: 'Project is updated',
  projectIsDeleted: 'Project is deleted',
  projectNotFound: 'Project not found',
  skillIsCreated: 'Skill is created',
  skillIsUpdated: 'Skill is updated',
  skillIsDeleted: 'Skill is deleted',
  skillNotFound: 'Skill not found',
  projectSkillIsCreated: 'Project Skill is created',
  projectSkillIsUpdated: 'Project Skill is updated',
  projectSkillIsDeleted: 'Project Skill is deleted',
  projectSkillNotFound: 'Project Skill not found',
  projectImageIsCreated: 'Project Image is created',
  projectImageIsUpdated: 'Project Image is updated',
  projectImageIsDeleted: 'Project Image is deleted',
  systemVariableIsCreated: 'System Variable is created',
  systemVariableIsUpdated: 'System Variable is updated',
  systemVariableIsDeleted: 'System Variable is deleted',
  systemVariableNotFound: 'System Variable not found',
  aboutMeIsUpdated: 'About Me is updated',
  aboutMeNotFound: 'About Me not found',
  scheduledIsRunning: 'Scheduled task is running',
  hasBeenScheduled: 'has been scheduled',
  isRunning: 'is Running',
  schedulesAreDisabled: 'Schedules are disabled',
  experienceIsCreated: 'Experience is created',
  experienceIsUpdated: 'Experience is updated',
  experienceIsDeleted: 'Experience is deleted',
  experienceNotFound: 'Experience not found',
  clientSource: 'clientSource',

  // Msg Errors
  internalServerError: 'A server error has occurred.',
  AnErrorOccurredWhileSavingTheData: 'An error occurred while saving the data.',
  redisError: 'An error occurred while trying to connect to Redis.',
  notPermissionError: 'You do not have permission to access this resource.',
  errorUsingAbstrackClass: 'This method must be implemented in the child class.',
  invalidCallbackFunction: 'Invalid callback function',
  invalidCronExpression: 'Invalid cron expression',
  taskAlreadyStarted: 'Task already started',
  taskNotStarted: 'Task not started',
  errorStorage: 'An error occurred while trying to save the file.',
  clientIdentifierError:
    'For security reasons, undefined requests are blocked. Please use any of the request ' +
    'tools available. ',

  // Errors
  applicationError: 'ApplicationError',
  badRequestError: 'BadRequestError',
  forbiddenError: 'ForbiddenError',
  notFoundError: 'NotFoundError',
  notFoundEntityError: 'NotFoundEntityError',
  unauthorizedError: 'UnauthorizedError',
  validationError: 'ValidationError',
  notImplementedError: 'NotImplementedError',

  // Others
  awsLocationSaEast1: 'sa-east-1',
  text: 'text',
  tooManyRequests: 'Too many requests from this IP, please try again later.',

  urlImagePrefix: 'https://portfoliolucasfelipeluz.s3.sa-east-1.amazonaws.com/',
  urlDocs: 'Documentation on the route: /docs',
  postmanCollectionLink:
    // eslint-disable-next-line max-len
    'https://elements.getpostman.com/redirect?entityId=21086350-298a4a4f-1c57-484a-8b3b-ff0a57f77b36&entityType=collection',
  welcome: 'Welcome to the Portfolio API - Lucas Felipe Luz',
  profile: 'profile',
  cv: 'cv',
  pdf: 'pdf',
  png: 'png',
};
