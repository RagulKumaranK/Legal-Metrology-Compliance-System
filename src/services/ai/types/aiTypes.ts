/**
 * Legal Metrology AI/ML Pipeline Types & Interfaces
 * 
 * PROTOTYPE ARCHITECTURE: Defines data contracts for production Vision LLM,
 * Object Detection, OCR Text Extraction, and Rule Engine modules.
 */

export interface ImageQualityMetrics {
  resolutionDpi: number;
  blurIndex: number;
  lightingScore: number;
  isAcceptable: boolean;
}

export interface PreprocessingResult {
  originalImageUri: string;
  processedImageUri: string;
  metrics: ImageQualityMetrics;
  cropCoordinates?: { x: number; y: number; width: number; height: number };
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

export interface DetectedLabelRegion {
  regionId: string;
  labelType: 'MANDATORY_DECLARATIONS' | 'MRP' | 'NET_QUANTITY' | 'MANUFACTURER' | 'DATE_MARKING' | 'CONSUMER_CARE';
  boundingBox: BoundingBox;
}

export interface ExtractedToken {
  text: string;
  confidence: number;
  boundingBox?: BoundingBox;
}

export interface OcrExtractionResult {
  rawText: string;
  tokens: ExtractedToken[];
  parsedFields: {
    productName?: string;
    netQty?: string;
    mrpText?: string;
    mfgDate?: string;
    bestBefore?: string;
    unitSalePrice?: string;
    manufacturer?: string;
    countryOfOrigin?: string;
    customerCare?: string;
  };
  overallConfidence: number;
}

export interface RuleEvaluationResult {
  ruleCode: string;
  ruleName: string;
  isRequired: boolean;
  isCompliant: boolean;
  detectedValue: string;
  expectedCondition: string;
  confidence: number;
  infractionDetails?: string;
}

export interface ComplianceScoreOutput {
  totalScore: number;
  passedCount: number;
  warningCount: number;
  violationCount: number;
  verdict: 'PASS' | 'REVIEW' | 'FAIL';
}

export interface InferencePipelineOutput {
  pipelineExecutionTimeMs: number;
  preprocessing: PreprocessingResult;
  detectedRegions: DetectedLabelRegion[];
  ocrOutput: OcrExtractionResult;
  ruleEvaluations: RuleEvaluationResult[];
  scoring: ComplianceScoreOutput;
}
