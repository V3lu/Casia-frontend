export interface DashboardSummaryDto {
  totalSales?: number;
  totalOrders?: number;
  totalProducts?: number;
  lowStockItems?: number;
  revenue?: number;
}

export interface AnalyticsReportDto {
  revenue?: number;
  orders?: number;
  conversionRate?: number;
  salesByPeriod?: AnalyticsDataPointDto[];
}

export interface AnalyticsDataPointDto {
  label: string;
  value: number;
}

export type OrderStatusDto = 'Pending' | 'Shipped' | 'Delivered' | 'Returned' | string;

export interface OrderDto {
  id?: string;
  orderId?: string;
  customer?: string;
  customerName?: string;
  status?: OrderStatusDto;
  orderStatus?: OrderStatusDto;
  total?: number;
  totalAmount?: number;
  amount?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface OrdersSummaryDto {
  pending?: number;
  shipped?: number;
  returns?: number;
  orders?: OrderDto[];
  data?: {
    orders?: OrderDto[];
  };
}

export type OrdersSummaryResponse = OrdersSummaryDto | OrderDto[];

export interface NotificationDto {
  id?: string;
  title?: string;
  message?: string;
  type?: 'info' | 'success' | 'warn' | 'error' | string;
  read?: boolean;
  createdAt?: string;
}

export type NotificationsResponse = NotificationDto[] | { notifications?: NotificationDto[] };

export interface MetricTileDto {
  label: string;
  value: string;
  note: string;
}

export interface DetailRowDto {
  name: string;
  value: string;
  note: string;
}

export interface SalesSummaryDto {
  summaryTiles?: MetricTileDto[];
  detailRows?: DetailRowDto[];
  data?: {
    summaryTiles?: MetricTileDto[];
    detailRows?: DetailRowDto[];
  };
}

export interface SuppliersSummaryDto {
  summaryTiles?: MetricTileDto[];
  detailRows?: DetailRowDto[];
  data?: {
    summaryTiles?: MetricTileDto[];
    detailRows?: DetailRowDto[];
  };
}

export interface PromotionsSummaryDto {
  summaryTiles?: MetricTileDto[];
  detailRows?: DetailRowDto[];
  data?: {
    summaryTiles?: MetricTileDto[];
    detailRows?: DetailRowDto[];
  };
}

export interface StaffSummaryDto {
  summaryTiles?: MetricTileDto[];
  detailRows?: DetailRowDto[];
  data?: {
    summaryTiles?: MetricTileDto[];
    detailRows?: DetailRowDto[];
  };
}

export interface SettingsSummaryDto {
  summaryTiles?: MetricTileDto[];
  detailRows?: DetailRowDto[];
  data?: {
    summaryTiles?: MetricTileDto[];
    detailRows?: DetailRowDto[];
  };
}