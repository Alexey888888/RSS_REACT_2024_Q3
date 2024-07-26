import { IBook } from '../pages/mainPage/types';

export interface IFetchBooks {
  bookList?: IBook[];
  totalElements?: number;
  error?: string;
}

interface PageInfo {
  firstPage: boolean;
  lastPage: boolean;
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface StarTrekApiResponse {
  page: PageInfo;
  books?: IBook[];
}

export interface ISearchTermProps {
  pageNumber: number;
  pageSize: number;
  term: string;
}

export interface IAuthor {
  uid: string;
  name: string;
  birthName: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  dateOfDeath: string | null;
  placeOfDeath: string | null;
  artDepartment: boolean;
  artDirector: boolean;
  productionDesigner: boolean;
  cameraAndElectricalDepartment: boolean;
  cinematographer: boolean;
  castingDepartment: boolean;
  costumeDepartment: boolean;
  costumeDesigner: boolean;
  director: boolean;
  assistantOrSecondUnitDirector: boolean;
  exhibitAndAttractionStaff: boolean;
  filmEditor: boolean;
  filmationProductionStaff: boolean;
  linguist: boolean;
  locationStaff: boolean;
  makeupStaff: boolean;
  merchandiseStaff: boolean;
  musicDepartment: boolean;
  composer: boolean;
  personalAssistant: boolean;
  producer: boolean;
  productionAssociate: boolean;
  productionStaff: boolean;
  publicationStaff: boolean;
  scienceConsultant: boolean;
  soundDepartment: boolean;
  specialAndVisualEffectsStaff: boolean;
  author: boolean;
  audioAuthor: boolean;
  calendarArtist: boolean;
  comicArtist: boolean;
  comicAuthor: boolean;
  comicColorArtist: boolean;
  comicCoverArtist: boolean;
  comicInteriorArtist: boolean;
  comicInkArtist: boolean;
  comicPencilArtist: boolean;
  comicLetterArtist: boolean;
  comicStripArtist: boolean;
  gameArtist: boolean;
  gameAuthor: boolean;
  novelArtist: boolean;
  novelAuthor: boolean;
  referenceArtist: boolean;
  referenceAuthor: boolean;
  publicationArtist: boolean;
  publicationDesigner: boolean;
  publicationEditor: boolean;
  publicityArtist: boolean;
  cbsDigitalStaff: boolean;
  ilmProductionStaff: boolean;
  specialFeaturesStaff: boolean;
  storyEditor: boolean;
  studioExecutive: boolean;
  stuntDepartment: boolean;
  transportationDepartment: boolean;
  videoGameProductionStaff: boolean;
  writer: boolean;
}

export interface IArtist {
  uid: string;
  name: string;
  birthName: string;
  gender: string;
  dateOfBirth: string | null;
  placeOfBirth: string;
  dateOfDeath: string | null;
  placeOfDeath: string | null;
  artDepartment: boolean;
  artDirector: boolean;
  productionDesigner: boolean;
  cameraAndElectricalDepartment: boolean;
  cinematographer: boolean;
  castingDepartment: boolean;
  costumeDepartment: boolean;
  costumeDesigner: boolean;
  director: boolean;
  assistantOrSecondUnitDirector: boolean;
  exhibitAndAttractionStaff: boolean;
  filmEditor: boolean;
  filmationProductionStaff: boolean;
  linguist: boolean;
  locationStaff: boolean;
  makeupStaff: boolean;
  merchandiseStaff: boolean;
  musicDepartment: boolean;
  composer: boolean;
  personalAssistant: boolean;
  producer: boolean;
  productionAssociate: boolean;
  productionStaff: boolean;
  publicationStaff: boolean;
  scienceConsultant: boolean;
  soundDepartment: boolean;
  specialAndVisualEffectsStaff: boolean;
  author: boolean;
  audioAuthor: boolean;
  calendarArtist: boolean;
  comicArtist: boolean;
  comicAuthor: boolean;
  comicColorArtist: boolean;
  comicCoverArtist: boolean;
  comicInteriorArtist: boolean;
  comicInkArtist: boolean;
  comicPencilArtist: boolean;
  comicLetterArtist: boolean;
  comicStripArtist: boolean;
  gameArtist: boolean;
  gameAuthor: boolean;
  novelArtist: boolean;
  novelAuthor: boolean;
  referenceArtist: boolean;
  referenceAuthor: boolean;
  publicationArtist: boolean;
  publicationDesigner: boolean;
  publicationEditor: boolean;
  publicityArtist: boolean;
  cbsDigitalStaff: boolean;
  ilmProductionStaff: boolean;
  specialFeaturesStaff: boolean;
  storyEditor: boolean;
  studioExecutive: boolean;
  stuntDepartment: boolean;
  transportationDepartment: boolean;
  videoGameProductionStaff: boolean;
  writer: boolean;
}

export interface IPublisher {
  uid: string;
  name: string;
  broadcaster: boolean;
  streamingService: boolean;
  collectibleCompany: boolean;
  conglomerate: boolean;
  visualEffectsCompany: boolean;
  digitalVisualEffectsCompany: boolean;
  distributor: boolean;
  gameCompany: boolean;
  filmEquipmentCompany: boolean;
  makeUpEffectsStudio: boolean;
  mattePaintingCompany: boolean;
  modelAndMiniatureEffectsCompany: boolean;
  postProductionCompany: boolean;
  productionCompany: boolean;
  propCompany: boolean;
  recordLabel: boolean;
  specialEffectsCompany: boolean;
  tvAndFilmProductionCompany: boolean;
  videoGameCompany: boolean;
  publisher: boolean;
  publicationArtStudio: boolean;
}

interface IEditor {
  uid: string;
  name: string;
}

interface IAudiobookNarrator {
  uid: string;
  name: string;
}

interface ICharacter {
  uid: string;
  name: string;
}

interface IReference {
  uid: string;
  description: string;
}

interface IBookCollection {
  uid: string;
  name: string;
}

interface IBookSeries {
  uid: string;
  name: string;
}

export interface IFetchDetailBook {
  book?: IBook & {
    bookSeries: IBookSeries[];
    authors: IAuthor[];
    artists: IArtist[];
    editors: IEditor[];
    audiobookNarrators: IAudiobookNarrator[];
    publishers: IPublisher[];
    audiobookPublishers: IPublisher[];
    characters: ICharacter[];
    references: IReference[];
    audiobookReferences: IReference[];
    bookCollections: IBookCollection[];
  };
  error?: string;
}
